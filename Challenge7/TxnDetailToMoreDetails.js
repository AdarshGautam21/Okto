
const { ApiPromise, WsProvider } = require('avail-js-sdk');
const { formatBalance } = require('avail-js-sdk/tools'); 

// Sample Avail Transaction Data (replace placeholders with actual values)
const transactionData = {
  hash: 'YOUR_TRANSACTION_HASH',
  blockHash: 'YOUR_BLOCK_HASH',
  signer: 'SIGNER_ADDRESS',
  method: {
    callIndex: '0x0100',   // Example callIndex for a transfer (might be different for Avail)
    args: {
      dest: 'RECIPIENT_ADDRESS', 
      value: 1234567890, 
    }
  }
};

async function analyzeTransaction(api: ApiPromise, txData) {
  const metaData = await api.rpc.state.getMetadata();
  const registry = metaData.registry;
  const { method, section } = registry.findMetaCall(txData.method.callIndex);

  // Assuming transfers will always be in the balances module
  const isTransfer = section === 'balances';

  if (isTransfer) {
    const amount = txData.method.args.value; 
    const sender = txData.signer.toString();
    const recipient = txData.method.args.dest.toString();
    const token = api.registry.chainTokens[0]; // Get the native token symbol

    console.log("Token transferred:", true);
    console.log("Token name:", token); // Use Avail's native token symbol
    console.log("Token type:", "Native");
    console.log("Transfer amount:", formatBalance(amount, { decimals: 12, withUnit: token})); // Format balance with symbol and decimals
    console.log("From address:", sender);
    console.log("To address:", recipient);

  } else {
    console.log("Token transferred:", false);
    console.log("Call Module:", section);
    console.log("Call Method:", method);
  }
}

async function main() {
  const wsProvider = new WsProvider('wss://ws.turing.avail.tools');
  const api = await ApiPromise.create({ provider: wsProvider, chainId: 22023 }); 
 
  await analyzeTransaction(api, transactionData);
}

main().catch(console.error);

