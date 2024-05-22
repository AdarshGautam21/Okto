const { ApiPromise, WsProvider } = require("@polkadot/api");
require("dotenv").config(); // Load environment variables

async function fetchAccountDetails(address) {
  const wsProvider = new WsProvider(process.env.WS_ENDPOINT);
  const api = await ApiPromise.create({ provider: wsProvider });

  // 1. Get Native Token Balance
  const { data: { free: nativeBalance } } = await api.query.system.account(address);

  // 2. List Fungible Token Assets and Balances

//   const assets = await api.query.assets.account.entries(address);
//   const fungibleAssets = assets.map(([key, value]) => ({
//     assetId: key.args[1].toNumber(),
//     balance: value.toJSON()
//   }));


  // 4. Get Account Details
  const { nonce, data: { free: reserved, miscFrozen, feeFrozen } } = 
        await api.query.system.account(address);
  const accountDetails = { nonce, reserved, miscFrozen, feeFrozen };

  // 5. Fetch Chain Information
  const chainInfo = {
    chainId: api.runtimeChain.toString(),
  };

  // Output Results (format as desired)
  console.log("Native Balance:", nativeBalance.toHuman());
//   console.log("Fungible Assets:", fungibleAssets);
  console.log("Account Details:", accountDetails);
  console.log("Chain Info:", chainInfo);

  await api.disconnect(); // Important: Clean up connection
}

// Usage Example (replace with actual address)
fetchAccountDetails(process.env.WALLET_ADDRESS);