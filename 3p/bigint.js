const bigInt = require("big-integer");

// console.log(exponentiation(110652658, 53721965, 134328091)); //28 --expected 68

/**
 * performs fast exponentiation
 * @param {number} x - base value
 * @param {number} y - exponent value
 * @param {number} n - modulus value
 * @returns {number} - returns result of exponentiation
 */
function exponentiation(x, y, n){
    let X = bigInt(x);
    let Y = bigInt(y);
    let N = bigInt(n);

    return (X.modPow(Y, N)).toJSNumber();
}

module.exports = { "exponentiation": exponentiation }