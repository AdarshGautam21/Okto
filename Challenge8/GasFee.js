import { ApiPromise, WsProvider } from '@polkadot/api';

async function estimateGas(api, transaction) {
  const gasEstimation = await api.rpc.payment.queryInfo(transaction.toHex()); // Estimate the gas for the provided transaction 
  const gasLimit = gasEstimation.weight; // The weight is an approximation of the computational resources (gas) needed to execute the transaction
  const gasPrice = gasEstimation.partialFee; // The partialFee is the estimated fee for the transaction, including a tip
  const estimatedFee = gasPrice.mul(gasLimit);

  return { gasPrice, gasLimit, estimatedFee }; // Return the estimated gas price, gas limit, and fee for the transaction
}

async function main() {
  const wsProvider = new WsProvider('wss://rpc.avail.tools');
  const api = await ApiPromise.create({ provider: wsProvider });

  // Create your transaction object (e.g., transfer, staking, etc.)
  const transaction = api.tx.balances.transfer(...);

  const { gasPrice, gasLimit, estimatedFee } = await estimateGas(api, transaction);

  console.log('Estimated Gas Price:', gasPrice.toHuman());
  console.log('Estimated Gas Limit:', gasLimit.toHuman());
  console.log('Estimated Fee:', estimatedFee.toHuman());
}

main().catch(console.error);
