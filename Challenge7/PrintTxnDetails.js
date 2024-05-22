import { ApiPromise, WsProvider } from '@polkadot/api';

async function main() {
  const wsProvider = new WsProvider('wss://rpc.avail.tools');
  const api = await ApiPromise.create({ provider: wsProvider });

  const txHash = 'YOUR_TRANSACTION_HASH'; // Replace with the actual transaction hash

  try {
    // 1. Fetch Transaction Details
    const extrinsic = await api.rpc.chain.getExtrinsic(txHash);
    
    // 2. Print Transaction Details
    console.log('\nTransaction Details:');
    console.log('Hash:', txHash);
    console.log('Block Number:', extrinsic.blockHash.toHex()); // Get the block hash in which the transaction is included
    console.log('Is Signed:', extrinsic.isSigned); 
    if (extrinsic.isSigned) {
      console.log('Signer:', extrinsic.signer.toString());
      console.log('Nonce:', extrinsic.nonce.toNumber());
      console.log('Era:', extrinsic.era.toHuman());
      console.log('Tip:', extrinsic.tip.toHuman());

      const { method, section } = api.registry.findMetaCall(extrinsic.callIndex);
      console.log('Call Module:', section);
      console.log('Call Method:', method);

      const { args } = extrinsic.method.toJSON();
      console.log('Call Arguments:', args);
    } else {
      console.log('This is an unsigned transaction (inherent extrinsic).');
    }
  } catch (error) {
    if (error.message.includes('Unable to retrieve extrinsic')) {
      console.error('Transaction not found.');
    } else {
      console.error('Error fetching transaction details:', error);
    }
  }
}

main().catch(console.error);
