const bip39 = require('bip39');
const bip32 = require('bip32');
const hdkey = require('hdkey');
const ethUtil = require('ethereumjs-util');

// Private key (hex)
const privateKey = "87b6d43213546895bbf946584199fa15751907381300df670a078fa4d8ff4ed6";

// Mnemonic (optional)
const mnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

// Derive master HD key from mnemonic
const seed = bip39.mnemonicToSeedSync(mnemonic);
const masterHDKey = hdkey.fromMasterSeed(seed);

// Derive child HD keys
const path = "m/44'/60'/0'/0/0";
const childHDKey = masterHDKey.derive(path);

// Derive private key and public key from child HD key
const childPrivateKey = childHDKey.privateKey.toString('hex');
const childPublicKey = childHDKey.publicKey.toString('hex');

// Derive wallet address from public key
const address = ethUtil.pubToAddress(childPublicKey, true).toString('hex');

console.log("Private key: ", privateKey);
console.log("Mnemonic: ", mnemonic);
console.log("Master HD key: ", masterHDKey.publicKey.toString('hex'));
console.log("Child HD key: ", childHDKey.publicKey.toString('hex'));
console.log("Child private key: ", childPrivateKey);
console.log("Child public key: ", childPublicKey);
console.log("Address: ", address);

// This script first derives the master HD key from the given mnemonic using the bip39 and hdkey libraries. It then derives the child HD key at the given path using the bip32 library. Finally, it derives the private key, public key, and wallet address from the child HD key using the ethereumjs-util library.

// Note that this script uses the bip39, bip32, hdkey, and ethereumjs-util libraries for deriving the HD keys and wallet address. You may need to install these libraries using npm before running the script.

// Also note that the resulting address is prefixed with "0x" to indicate that it is an Ethereum address. If you want to derive an Avail address, you can replace the ethUtil.pubToAddress function with a function that derives the Avail address from the public key.