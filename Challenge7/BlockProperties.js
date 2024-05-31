const { ApiPromise, WsProvider } = require("avail-js-sdk");

async function main() {
  const wsProvider = new WsProvider('wss://ws.turing.avail.tools'); // Use Turing Testnet endpoint
  const api = await ApiPromise.create({ provider: wsProvider, chainId: 22023 });

  const blockNumber = 123456; 

  try {
    // 1. Fetch Block Hash
    const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
    if (blockHash.isEmpty) {
      throw new Error(`Block with number ${blockNumber} not found`);
    }

    // 2. Fetch Full Block
    const signedBlock = await api.rpc.chain.getBlock(blockHash);

    // 3. Extract Transaction Hashes and Additional Details
    const extrinsics = signedBlock.block.extrinsics;
    console.log(`\nBlock Number: ${blockNumber}`);
    console.log(`Block Hash: ${blockHash.toHex()}`);
    console.log(`Extrinsics Count: ${extrinsics.length}`);

    console.log("Extrinsics:");
    extrinsics.forEach((ex, index) => {
      console.log(`  ${index + 1}. Hash: ${ex.hash.toHex()}`);
      console.log(`      Is Signed: ${ex.isSigned}`);
      if (ex.isSigned) {
        console.log(`      Signer: ${ex.signer.toString()}`);
        // You can add more details like the transaction's call module and method if needed
        if (ex.method) {
          console.log(`      Call: ${ex.method.section}.${ex.method.method}`);
        } 
      }
    });
  } catch (error) {
    console.error('Error fetching block data:', error);
  } finally {
    await api.disconnect(); // Always disconnect after use
  }
}

main().catch(console.error);
