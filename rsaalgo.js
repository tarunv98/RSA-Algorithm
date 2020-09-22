const conf = require('./conf/rsa.json');
const keys = require('./lib/keys');
const crypt = require('./lib/crypt')

exports.RSA = class {
    mod_value = 0;
    psi_value = 0;
    public_exponent = 0;
    private_exponent = 0;
    public_key = ''
    private_key = ''
    size = 0;
    values = null;

    /**
     * RSA constructor
     * @param {*} val - size or key object as specified in mode 
     * @param {string} [mode] - "size" -> to create a new key; "key" -> to use an exixting key; by default it looks for size or takes default size
     */
    constructor(val, mode) {
        let key = val;
        if(mode === 'key' || mode === null){
            if(!key) throw new Error('Invalid Key')
            this.mod_value = key.mod_value;
            this.psi_value = key.psi_value;
            this.public_exponent = key.public_exponent;
            this.private_exponent = key.private_exponent;
            this.public_key = ''
            this.private_key = ''
            this.size = key.size;
            this.values = {"mod": key.mod_value, "psi": key.psi_value};
        }else{
            this.size = val ? val : conf.DEF_MOD_SIZE;
            // console.log(this.size)
            if(this.size > 31) throw new Error('Size too large. Expected less than 32');
            try{
                this.values = keys.getModandPsiValues(val);
                this.mod_value = this.values.mod;
                this.psi_value = this.values.psi;
                this.public_exponent = keys.getPubExponent(this.psi_value);
                this.private_exponent = keys.getPvtExponent(this.public_exponent, this.mod_value);
            }catch(err){console.log(`[RSA][ERROR] Error at key generation - ${err}`)} 
        }
    }    

    /**
     * RSA Encryption
     * @param {string} msg - string or buffer to be encrypted
     * @returns {Buffer} - cipher buffer
     */
    encrypt(msg){
        try{
            return crypt.encrypt(this.public_exponent, this.mod_value, msg);
        }catch(err){
            console.log(`[RSA][ERROR] Error occured while encryption. \n ${err}`)
        }
    }

    /**
     * RSA Decryption
     * @param {Buffer} cipher - cipher buffer
     * @returns {Buffer} - deciphered buffer
     */
    decrypt(cipher){
        try{
            return crypt.decrypt(this.private_exponent, this.mod_value, cipher);
        }catch(err){
            console.log(`[RSA][ERROR] Error occured while decryption. \n ${err}`)
        }
    }

    //YET TO BE DEVELOPED

    //key generation
    //verification
    //signing

}