const format = require('./format');
const utils = require('./utils');

// let g = encrypt(3, 667, "H");
// console.log(g) // b = 10
// decrypt(411, 667, g);
/**
 * RSA encryption
 * @param {number} e - RSA public exponent
 * @param {number} n - RSA modulus value
 * @param {number} t - message to be encrypted
 * @returns {Buffer} - encrypted buffer
 */
function encrypt(e, n, t){ // Encryption c = (msg ^ e) % n

    let cipher = '';
    let c = 0;
    let a = '';
    let buf = format.str2buff(t);

    for(let msg of buf){
        c = utils.exponentiation(msg, e, n);
        cipher = cipher + ' ' + c.toString();
    }
    // console.log(t, cipher);
    return format.str2buff(cipher);

}

function decrypt(d, n, c){

    let text = '';
    let x = 0;
    let temp = 0;
    let cipher = c.toString().split(' ');

    // console.log(cipher);

    for(let num of cipher){
        if(num){
            // console.log(parseInt(num), d, n);
            temp = parseInt(num);
            x = utils.exponentiation(temp, d, n);
            text = text + String.fromCharCode(x);
        }
    }

    // console.log(c, text);
    return format.str2buff(text);

}

module.exports = {"encrypt": encrypt, "decrypt": decrypt}