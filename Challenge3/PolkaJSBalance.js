const { ApiPromise, HttpProvider } = require('@polkadot/api');
require('dotenv').config();

async function fetchAccountDetails(address) {
  const httpProvider = new HttpProvider(process.env.HTTP_ENDPOINT); 
  const api = await ApiPromise.create({ provider: httpProvider });

  try {
    // Get Native Token Balance
    const accountInfo = await api.query.system.account(address);

    const nativeBalance = accountInfo.data?.free ?? '0';
    const nonce = accountInfo.data?.nonce ?? '0';
    const reserved = accountInfo.data?.reserved ?? '0';
    const miscFrozen = accountInfo.data?.miscFrozen ?? '0';
    const feeFrozen = accountInfo.data?.feeFrozen ?? '0';

    // Account Details
    const accountDetails = { 
      nonce: nonce.toString(), 
      reserved: reserved.toString(), 
      miscFrozen: miscFrozen.toString(), 
      feeFrozen: feeFrozen.toString() 
    };

    // Chain Information
    const chainInfo = {
      chainId: api.runtimeVersion?.specName?.toString() ?? 'unknown',
      runtimeVersion: api.runtimeVersion?.specVersion?.toString() ?? 'unknown'
    };

    console.log("Native Balance:", nativeBalance.toString());
    console.log("Account Details:", accountDetails);
    console.log("Chain Info:", chainInfo);
  } catch (error) {
    if (error.name === 'ApiConnectionError') {
      console.error(`Failed to connect to Polkadot node: ${error.message}`);
      // Consider adding retry logic here
    } else {
      console.error("Error fetching account details:", error);
    }
  } finally {
    if (api) {
      await api.disconnect();
    } 
  }
}

fetchAccountDetails(process.env.WALLET_ADDRESS);