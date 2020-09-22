# RSA Algorithm 1.0
An RSA implementation in NodeJS

[RSA wiki](https://simple.wikipedia.org/wiki/RSA_algorithm)

*This is an RSA calculator to compute prime numbers(p, q), mod value, psi value, public and private exponents. You can also perform string encryption and decryption.*

**Features:**
* Calculating primes(p, q), mod value(n), psi value(psi), public exponent(e) and private exponent(d).
* All values are generated based on one input which is size of mod (n) (in bits)
* String encryption and decryption.

**Algorithm:**

Suppose the required size of mod value is 16bits.
1. Generate two prime numbers (p, q) such that the size of their product (which is mod value, n) is 16.
```
n = p * q
```
2. Calculate psi value.
```
psi = (p-1) * (q-1)
```
3. Compute a public exponent (e) such that e and psi are co-primes and 0 < e < psi.
```
e
```
4. Compute private exponent (d).
```
For a constant k, d = (k*psi + 1)/e; such that (k*psi + 1) % e = 0
```
5. For encryption
```
c = (t^e) % n
```
6. For decryption
```
t = (c^d) % n
```
**Example:**

* size = 16bits
* p = 181; q = 191;
* n =p*q = 34571
* psi = (p-1)(q-1) = 34200
* e = 7
* d = 19543

**Instructions:**

1. Clone the Repo
2. Install dependencies
```
npm install
```
3. Check index.js file for implementation

:v:Thats it!!:v:

PS: The maximum acceptable size of mod value is 31
   
