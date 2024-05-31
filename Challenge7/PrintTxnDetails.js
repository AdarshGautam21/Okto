const { ApiPromise, WsProvider } = require('avail-js-sdk');

async function main() {
  const wsProvider = new WsProvider("wss://ws.turing.avail.tools");
  const api = await ApiPromise.create({ provider: wsProvider, chainId: 22023 });

  const txHash = 'YOUR_TRANSACTION_HASH'; // Replace with the actual transaction hash

  try {
    // 1. Fetch Transaction Details
    const extrinsic = await api.rpc.chain.getExtrinsic(txHash);

    // 2. Print Transaction Details
    console.log('\nTransaction Details:');
    console.log('Hash:', txHash);
    console.log('Block Hash:', extrinsic.blockHash.toHex());
    console.log('Is Signed:', extrinsic.isSigned);

    if (extrinsic.isSigned) {
      console.log('Signer:', extrinsic.signer.toString());
      console.log('Nonce:', extrinsic.nonce.toNumber());

      // Avail doesn't have an era like Polkadot. You can remove this line.
      // console.log('Era:', extrinsic.era.toHuman());

      console.log('Tip:', extrinsic.tip.toHuman()); 

      // Use Avail-specific method to get call details
      const { callIndex } = extrinsic.toHuman();
      const { section, method } = api.registry.findMetaCall(callIndex);
      console.log('Call Module:', section);
      console.log('Call Method:', method);

      const { args } = extrinsic.method.toJSON();
      console.
