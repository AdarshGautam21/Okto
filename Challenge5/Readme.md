# Account Initialization on Avail

On Avail, accounts are initialized automatically once they receive their first transaction. This can be either:

- **Transfer of Native Token (AVAX):** Any amount of AVAX (even the smallest unit) will trigger account initialization.
- **Transfer of Other Tokens/Assets:** Any transfer of a token or asset (even non-native) to a non-existent address will also initialize the account.

## Automatic Initialization

Avail doesn't require a separate "account creation" transaction. The network's design prioritizes simplicity and efficiency. When you generate a new private key, the corresponding address exists implicitly. It becomes an active account with a balance and transaction history only once it receives its first transfer.

## Script to Initialize and Fetch Account Details

Here's a JavaScript script using the Avail SDK to check if an account exists, initialize it if not, and fetch its details:

```javascript
// JavaScript code
// Script provided by Avail Foundation
// Refer to official documentation for the latest updates and usage instructions

const { ApiPromise, WsProvider, Keyring } = require("avail-js-sdk");
require("dotenv").config();

async function initializeAndFetchAccountDetails(address) {
  const wsProvider = new WsProvider(process.env.AVAIL_WS_ENDPOINT);
  const api = await ApiPromise.create({ provider: wsProvider, chainId: 22023 });

  const keyring = new Keyring({ type: 'sr25519' });
  const sender = keyring.addFromUri(process.env.SENDER_MNEMONIC); 

  try {
    // Try to fetch account details
    await api.query.system.account(address);
    console.log("Account is already initialized.");
  } catch (error) {
    console.log("Account not initialized. Initializing...");

    // Initialize the account with a small amount of AVAX
    const transferExtrinsic = api.tx.balances.transfer(address, 1);
    const txHash = await transferExtrinsic.signAndSend(sender);

    console.log(`Account initialized. Transaction hash: ${txHash}`);
  }

  // Fetch and display account details after initialization
  const { nonce, data: { available: availableBalance } } = await api.query.system.account(address);
  console.log("Available Balance:", availableBalance.toString());
  console.log("Nonce:", nonce.toNumber());

  await api.disconnect();
}

initializeAndFetchAccountDetails("YOUR_AVAIL_ADDRESS");
```

Save this script as `initializeAccount.js` and ensure you have the necessary dependencies and environment variables set up. You can run the script using Node.js to initialize an Avail account and fetch its details.

