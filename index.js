const rsa = require('./rsaalgo');
const crypt = require('./lib/crypt');

const key = new rsa.RSA(31, 'size'); // maximum size is 31

// const key = new rsa.RSA(31);

// let keyy = {
//                 "mod_value": 1074200609,
//                 "psi_value": 1074135060,
//                 "public_exponent": 7,
//                 "private_exponent": 613791463,
//                 "public_key": '',
//                 "private_key": '',
//                 "size": 31,
//                 "values": { mod: 1074200609, psi: 1074135060 }
//             }
// const key = new rsa.RSA(keyy, 'key');

// const key = new rsa.RSA('', 'key');

const text = "Hello World!";

let cipher = null;
let decipher = null;

cipher = key.encrypt(text);
decipher = key.decrypt(cipher)

console.log(key, `\nGenerated Cipher:\n ${cipher.toString()};\nDeciphered Text:\n ${decipher.toString()}`);