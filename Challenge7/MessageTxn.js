const { ApiPromise, HttpProvider } = require ('@polkadot/api');
require ("dotenv").config();
async function main() {
  const httpProvider = new HttpProvider(process.env.HTTP_ENDPOINT); 
  const api = await ApiPromise.create({ provider: httpProvider, chainId: 22023 });
  

  // Get transaction hash from user input or command-line arguments
  const txHash = process.argv[2] || '0x92cdb77314063a01930b093516d19a453399710cc8ae635ff5ab6cf76b26f218'; // Replace 'YOUR_TRANSACTION_HASH' if providing via code
  const blockHash = process.argv[3];

  try {
    // 1. Fetch Block 
    const block = await (blockHash ? api.rpc.chain.getBlock(blockHash) : api.rpc.chain.getBlock());
  

    // 2. Fetch Transaction Details
    const extrinsic = block.block.extrinsics.find(ex => ex.hash.eq(txHash));
    if (!extrinsic) {
      throw new Error(`Transaction with hash ${txHash} not found in block`);
    }

    // 3. Print Transaction Details
    console.log('\nTransaction Details:');
    console.log('  Hash:', txHash);
    console.log('  Block Number:', block.block.header.number.toNumber());
    console.log('  Block Hash:', block.block.hash.toHex());
    console.log('  Is Signed:', extrinsic.isSigned);
    if (extrinsic.isSigned) {
      console.log('  Signer:', extrinsic.signer.toString());
      console.log('  Nonce:', extrinsic.nonce.toNumber());
      console.log('  Era:', extrinsic.era.toHuman());
      console.log('  Tip:', extrinsic.tip.toHuman());

      // Find the call module and method names
      const { section, method } = api.registry.findMetaCall(extrinsic.callIndex);
      console.log('  Call Module:', section);
      console.log('  Call Method:', method);

      // Decode and print the call arguments (if available)
      const args = extrinsic.args.map(arg => arg.toHuman());
      if (args.length > 0) {
        console.log('  Call Arguments:');
        args.forEach((arg, index) => {
          console.log(`    ${index + 1}. ${JSON.stringify(arg, null, 2)}`); // Pretty-print JSON
        });
      }
    } else {
      console.log('  This is an unsigned transaction (inherent extrinsic).');
    }
    
    // 4. Fetch and Print Events (filter for this transaction)
    const events = block.block.extrinsics
        .filter(ex => ex.hash.eq(txHash))
        .map(ex => ex.events)
        .flat();

    if (events.length > 0) {
        console.log('\nEvents:');
        events.forEach((event, index) => {
          console.log(`  ${index + 1}. Section: ${event.event.section}`);
          console.log(`     Method: ${event.event.method}`);
          console.log(`     Data: ${JSON.stringify(event.event.data.toHuman(), null, 2)}`); 
        });
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
