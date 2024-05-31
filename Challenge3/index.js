const { ApiPromise, WsProvider } = require("avail-js-sdk"); // Use Avail SDK
require("dotenv").config(); // Load environment variables

async function fetchAccountDetails(address) {
  // Connect to Avail Node
  const wsProvider = new WsProvider(process.env.AVAIL_WS_ENDPOINT);
const api = await ApiPromise.create({
    provider: wsProvider,
    chainId: 22023, // Turing Testnet Chain ID 
});


  // 1. Get Native Token Balance (Available Balance)
  const { data: { available: availableBalance } } = await api.query.system.account(address);

  // 2. List Fungible Token Assets and Balances (NOT CURRENTLY SUPPORTED)
  // Avail is still under development and doesn't have a direct equivalent to Substrate's assets module. 
  // You might need to interact with specific token contracts directly if they exist on Avail.

  // 3. List Non-Fungible Token Assets (NOT CURRENTLY SUPPORTED)
  // Similar to fungible tokens, NFTs are not natively supported in the current Avail SDK. 
  // You'll need to wait for future updates or interact with specific NFT contracts.

  // 4. Get Account Details
  const { nonce, data: { free: reserved, miscFrozen, feeFrozen } } = 
        await api.query.system.account(address);
  const accountDetails = { nonce, reserved, miscFrozen, feeFrozen };

  // 5. Fetch Chain Information
  const runtimeVersion = await api.rpc.state.getRuntimeVersion();
  const chainInfo = {
    chainId: api.runtimeChain.toString(),
    runtimeVersion: runtimeVersion.specName.toString(),
  };

  // Output Results 
  console.log("Available Balance:", availableBalance.toString()); 
  console.log("Account Details:", accountDetails);
  console.log("Chain Info:", chainInfo);

  await api.disconnect(); // Clean up the connection
}

// Usage Example (replace with actual address from your .env file)
fetchAccountDetails(process.env.WALLET_ADDRESS);
