const { cryptoWaitReady } = require('@polkadot/util-crypto');
const { Keyring } = require('@polkadot/keyring');

async function deriveWalletHierarchy(mnemonic, depthLimit = 3) {
  await cryptoWaitReady();

  const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 });

  // Function to recursively derive and print accounts
  async function deriveAccounts(pair, path = '', depth = 0) {
    if (depth > depthLimit) return; // Termination condition

    const address = pair.address;
    console.log(`Derivation Path: ${path}, Address: ${address}`);

    // Derive child account paths
    const nextPath1 = `${path}//0`;
    const nextPath2 =`${path}//1`;

    const nextPair1 = pair.derive(nextPath1);
    const nextPair2 = pair.derive(nextPath2);

    await deriveAccounts(nextPair1, nextPath1, depth + 1);
    await deriveAccounts(nextPair2, nextPath2, depth + 1);
  }

  // Start deriving accounts from the mnemonic
  const masterPair = keyring.addFromUri(mnemonic);
  await deriveAccounts(masterPair, '//m');
}

// Example Usage
const mnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

deriveWalletHierarchy(mnemonic);