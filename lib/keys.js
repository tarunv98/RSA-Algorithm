const utils = require('./utils');

// console.log(getPubExponent(15));
// console.log(getPvtExponent(11, 16637));

// let mod_val = 0;
// let psi_val = 0;

/**
 * return RSA public exponent generated with a modulus value of given size
 * @param {number} n_size - size of modulus value or key value
 * @returns {number} - RSA public exponent
 */
function getPubExponent(psi){
    // console.log(values.mod, psi)
    for(let i = 2; i<psi; i++){
        if(utils.isCoPrime(psi, i)) return i;
    }

}

/**
 * return RSA private exponent generated with a modulus value of given size
 * @param {number} e - RSA public exponent
 * @param {*} n - RSA modulus value
 * @returns {number} - RSA private exponent
 */
function getPvtExponent(e, n){
    let d = 0;
    let p = 0;
    let q = 0;
    let psi = 0;
    for(let i = 2; i<n; i++){
        p = utils.getNextPrime(i);
        if(n%p === 0) { q=n/p; psi = (p-1)*(q-1); }
        if(psi){
            for(let j = 2; j < 100; j++){
                d = j*psi + 1;
                if(d % e === 0) return (d/e);
            }
            break;
        }
        i = p;
    }
}


/**
 * generates an RSA modulus and Psi function values
 * @param {number} n_size - size of modulus value
 * @returns {object} - {"mod", "psi"}
 */
function getModandPsiValues(n_size){
    let primes = utils.getPrimes(n_size);
    // console.log(primes.p, primes.q);
    mod_val = primes.n;
    psi_val = (primes.p-1)*(primes.q-1);
    return {"mod": primes.n, "psi": psi_val};
}

module.exports = {"getModandPsiValues": getModandPsiValues, "getPubExponent": getPubExponent, "getPvtExponent": getPvtExponent};