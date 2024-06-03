const { ApiPromise, HttpProvider } = require('@polkadot/api');
const { decodeAddress, isHex } = require('@polkadot/util-crypto'); // For address formatting

// Replace with your Avail node's WebSocket endpoint
const provider = new HttpProvider('https://turing-rpc.avail.so/rpc');

// Load your token metadata (symbol, decimals) from a JSON file (or other source)
const tokenMetadata = require('./token_metadata.json'); // Adapt to your format

async function analyzeTransaction(txnHash) {
  const api = await ApiPromise.create({ provider });

  const blockHash = await api.rpc.chain.getBlockHash(); // Get the latest block hash
  const signedBlock = await api.rpc.chain.getBlock(blockHash); 
  const allRecords = await api.query.system.events.at(blockHash);

  const extrinsicIndex = signedBlock.block.extrinsics.findIndex(
    (extrinsic) => extrinsic.hash.toHex() === txnHash
  );
  
  if (extrinsicIndex === -1) {
    console.log('Transaction not found in the latest block.');
    return;
  }

  const events = allRecords.filter(({ phase }) => 
    phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(extrinsicIndex)
  );

  // Assuming your token transfer event name is 'Transfer'
  const transferEvent = events.find(({ event }) => 
    api.events.balances.Transfer.is(event) ||  // Native token transfer
    api.events.yourTokenModule.Transfer.is(event) // Your custom token module
  );

  if (transferEvent) {
    const [from, to, amount] = transferEvent.event.data;
    const tokenSymbol = tokenMetadata[transferEvent.event.section] || 'AVAX'; 
    const decimals = tokenMetadata[`${transferEvent.event.section}_decimals`] || 18; // Default to 18 for AVAX
    console.log('Token Transfer Detected:');
    console.log(`  Token: ${tokenSymbol}`);
    console.log(`  From: ${decodeAddress(from).toString()}`); // Format Avail address
    console.log(`  To: ${decodeAddress(to).toString()}`);
    console.log(`  Amount: ${api.createType('Balance', amount).toHuman()}`); // Format using the API's type
  } else {
    console.log('No token transfer detected in this transaction.');
  }

}

// Get transaction hash from command-line argument or input
const txnHash = process.argv[2];
if (!txnHash || !isHex(txnHash)) {
  console.error('Please provide a valid transaction hash as an argument.');
  process.exit(1);
}

analyzeTransaction("0x547bc015b3a3c9bd89efe7c10bf60a6c95b4beb36d61288b383355fbdb7e4625").catch(console.error); // Handle potential errors
