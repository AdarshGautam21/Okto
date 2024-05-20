const secp256k1 = require('secp256k1');
const keccak256 = require('js-sha3').keccak256;

// Private key (hex)
const privateKey = "87b6d43213546895bbf946584199fa15751907381300df670a078fa4d8ff4ed6";

// Convert private key to buffer
const privateKeyBuffer = Buffer.from(privateKey, 'hex');

// Generate public key from private key
const publicKey = secp256k1.publicKeyCreate(privateKeyBuffer);
const publicKeyBuffer = Buffer.from(publicKey, 'hex');

// Convert public key to wallet address
const publicKeyBytes = Buffer.concat([Buffer.from('04', 'hex'), publicKeyBuffer]);
const hash = keccak256.create();
hash.update(publicKeyBytes);
const hashHex = hash.hex();
const address = `Avail${hashHex.slice(-40)}`;

console.log("Private key: ", privateKey);
console.log("Public key: ", publicKey);
console.log("Address: ", address);

//This script first generates a public key from the given private key using the secp256k1 library. It then converts the public key to a wallet address by taking the last 40 hex characters of the double-SHA3 hash of the public key, and prepending "Avail" to the result.

//Note that this script uses the secp256k1 library for generating the public key from the private key, and the js-sha3 library for hashing the public key. You may need to install these libraries using npm before running the script.