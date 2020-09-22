const bigint = require('../3p/bigint');
// console.log(exponentiation(44496911, 61112291, 67239919)); // 27 --68 correct
// console.log(exponentiation(110652658, 53721965, 134328091)); //28 --expected 68

/**
 * generates two random prime numbers based on the the modulus size
 * @param {number} n_size - size of modulus value or key value
 * @returns {object} - {"p" <number> ,"q" <number>, "n"}
 */
function getPrimes(n_size){

    let p = 0;
    let q = 0;
    let iter = 0;
    let size = 0;

    for(let i = 0; size!=n_size; i++){
        p = getNextPrime(p);
        q = getNextPrime(p);
        size = getSize(p * q);
        iter++;
    }

    return {"p": p, "q": q, "n": p*q};
}

/**
 * returns immediate prime number after given value
 * @param {number} num - starting number/ base number
 * @returns {number} - prime number
 */
function getNextPrime(num){
    
    let flag = 1;

    for(let i = num+1; i > 0; i++){
        for(let j = 2; j < i; j++){
            if(i % j === 0){
                flag = 0;
                break;
            }
        }
        if(flag === 1) return i;
        flag = 1;
    }

}

/**
 * returns memory size of the number
 * @param {number} num - number to which size is to be computed
 * @returns {number} - size of given number
 */
function getSize(num){
    return num2bin(num).length;
}

/**
 * returns binary format of given number
 * @param {number} num - number to which binary needs to be computed
 * @returns {string} - binary format of given number
 */
function num2bin(num){
    let bin = ''
        temp = 0
        r = 0

    for(let i = 0; num > 0; i++){
        r = num % 2;
        bin = r.toString() + bin;
        temp = Math.floor(num / 2);
        num = temp;
    }   
    return bin;
}

/**
 * 
 * @param {number} a - first number
 * @param {number} b - secons number
 * @returns {boolean} - returns true is co prime else false
 */
function isCoPrime(a, b) {

    if (getGCD(a, b) === 1) {
        return true;
    } else {
        return false;
    }

}

/**
 * 
 * @param {number} a - first number
 * @param {number} b - second number
 * @returns {number} - returns GCD of given number
 */
function getGCD(a, b) {

    //METHOD 1
    // a = Math.abs(a);
    // b = Math.abs(b);
    // if (b > a) {var temp = a; a = b; b = temp;}
    // while (true) {
    //     if (b == 0) return a;
    //     a %= b;
    //     if (a == 0) return b;
    //     b %= a;
    // }

    // METHOD 2
    // // Everything divides 0  
    // if (a == 0 || b == 0) return 0;

    // // base case 
    // if (a == b) return a;

    // // a is greater 
    // if (a > b) return getGCD(a - b, b);

    // return getGCD(a, b - a);

    // METHOD 3 - Euclidean Algorithm
    let R;
    while ((a % b) > 0) {
        R = a % b;
        a = b;
        b = R;
    }
    return b;

}

/**
 * performs fast exponentiation
 * @param {number} x - base value
 * @param {number} y - exponent value
 * @param {number} n - modulus value
 * @returns {number} - returns result of exponentiation
 */
function exponentiation(x, y, n){
    let res = 0;
    const MAX_INT = 999999;
    let b = '';
    let bin = 0;
    let r = 0;
    let temp = 0;
    let base = 0;
    let final = 1;

    if(x>MAX_INT) return bigint.exponentiation(x, y, n);

    b = num2bin(y);
    base = x % n;
    // console.log(b, base);
    for(let i=0; i<b.length; i++){
        r = parseInt(b.charAt((b.length-1)-i));

        if(i!==0) base = mymod(base, base, n);

        if(r === 1){
            final = final * (r * base);
        }
        if(final >= MAX_INT){
            temp = final % n;
            final = temp;
        }
        // console.log(r, base, final);

    }
    
    res = final % n;
    return res;
}

/**
 * performs custom mod operation (a*b)%n = ((a%n)*(b%n))%n
 * @param {number} a - first factor of exponent
 * @param {number} b - second factor of exponent
 * @param {number} n - modulus value
 * @return {number} - returns mod result
 */
function mymod(a, b, n){
    // console.log(`REACHED HERE ${(a%n)*(b%n)}`)
    return (((a%n)*(b%n)) % n);
}

module.exports = {"getPrimes": getPrimes, "isCoPrime": isCoPrime, "getNextPrime": getNextPrime, "exponentiation": exponentiation}