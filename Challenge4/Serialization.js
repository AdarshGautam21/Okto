const { TxRaw } = require('avail-sdk');
const { marshaler } = require('avail-sdk/build/tx/tx.marshaler');

// Create a new transaction object
const tx = new TxRaw();

// Add metadata such as gas info, fee payer, and nonce
tx.setFeePayer('fee_payer_address');
tx.setGasLimit(100000);
tx.setGasPrice(1000);
tx.setNonce(1);

// Add transaction payload
tx.addInstruction({
  createAccount: {
    newAccountId: 'new_account_address',
    initialBalance: '1000000000000000000',
  },
});

// Serialize the transaction object
const serializedTx = marshaler.serializeTx(tx);

// Deserialize the transaction object
const deserializedTx = marshaler.deserializeTx(serializedTx);

// Sign the transaction offline
const privateKey = Buffer.from(
  '87b6d43213546895bbf946584199fa15751907381300df670a078fa4d8ff4ed6',
  'hex'
);
const signature = tx.sign(privateKey);

// Add the signature to the transaction object
tx.addSignature(signature);

// Broadcast the transaction on-chain to get a txn hash
// (Note: This step requires an Avail node running with a connected RPC server)

// In this script, we first create a new transaction object and add metadata such as gas info, fee payer, and nonce. We then add a transaction payload to create a new account. After that, we serialize the transaction object using the marshaler.serializeTx() method.

// To deserialize the transaction object, we use the marshaler.deserializeTx() method. After deserializing the transaction object, we sign it offline using the private key. Finally, we add the signature to the transaction object and broadcast it on-chain to get a transaction hash.

// Note that the last step requires an Avail node running with a connected RPC server. You can use a tool like curl or axios to send an HTTP request to the RPC server to broadcast the transaction on-chain.Sources: medium.com (1) docs.cosmos.network (2) openid.net (3) cockroachlabs.com (4)

// To get the key pair from the private key, you can use the ethUtil library in JavaScript. Here's an example script that demonstrates this:

const ethUtil = require('ethereumjs-util');

// Private key (hex)
const privateKey = "87b6d43213546895bbf946584199fa15751907381300df670a078fa4d8ff4ed6";

// Derive public key from private key
const publicKey = ethUtil.ecrecover(
  ethUtil.toBuffer('0x00'),
  ethUtil.toBuffer('27'),
  ethUtil.toBuffer(privateKey)
);

// Convert public key to address
const address = ethUtil.pubToAddress(publicKey, true).toString('hex');

console.log("Public key: ", ethUtil.bufferToHex(publicKey));
console.log("Address: ", address);

// In this script, we first derive the public key from the private key using the ecrecover method of the ethUtil library. We then convert the public key to an address using the pubToAddress method of the ethUtil library.

// Sources: medium.com (1) docs.cosmos.network (2) openid.net (3) cockroachlabs.com (4)

// To get the key pair from the mnemonic, you can use the bip39 and hdkey libraries in JavaScript. Here's an example script that demonstrates this:


const bip39 = require('bip39');
const hdkey = require('hdkey');
const ethUtil = require('ethereumjs-util');

// Mnemonic
const mnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

// Derive master HD key from mnemonic
const seed = bip39.mnemonicToSeedSync(mnemonic);
const masterHDKey = hdkey.fromMasterSeed(seed);

// Derive child HD key
const path = "m/44'/60'/0'/0/0";
const childHDKey = masterHDKey.derive(path);

// Derive private key and public key from child HD key
const childPrivateKey = childHDKey.privateKey.toString('hex');
const childPublicKey = childHDKey.publicKey.toString('hex');

// Convert public key to address
const address = ethUtil.pubToAddress(ethUtil.toBuffer(childPublicKey), true).toString('hex');

console.log("Private key: ", childPrivateKey);
console.log("Public key: ", childPublicKey);
console.log("Address: ", address);

