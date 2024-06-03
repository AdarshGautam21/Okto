const { cryptoWaitReady } = require('@polkadot/util-crypto');
const { Keyring } = require('@polkadot/keyring');

async function generateKeysFromPrivateKey(privateKey) {
  await cryptoWaitReady();

  // Create a keyring instance
  const keyring = new Keyring({ type: 'sr25519' });

  // Create a key pair from the provided private key
  const keyPair = keyring.createFromUri(privateKey);

  // Get the public key from the key pair
  const publicKey = keyPair.publicKey.toString();

  // Get the wallet address from the key pair
  const address = keyPair.address;

  return { publicKey, address };
}

// Example usage
const privateKey = '87b6d43213546895bbf946584199fa15751907381300df670a078fa4d8ff4ed6';

generateKeysFromPrivateKey(privateKey)
  .then(({ publicKey, address }) => {
    const publicKeyBytes = publicKey.split(',').map(byteStr => parseInt(byteStr).toString(16).padStart(2, '0'));
    console.log('Private Key:', privateKey);
    const hexString = publicKeyBytes.join('');
    console.log('Public Key:', hexString);
    console.log('Wallet Address:', address);
  })
  .catch(error => {
    console.error('Error:', error);
  });