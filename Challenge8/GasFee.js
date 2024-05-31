const { ApiPromise, WsProvider } = require("avail-js-sdk");

async function estimateGas(api, transaction) {
    // Create a call to a specific pallet function
    // You will need to provide the pallet name and the function name
    const paymentInfo = await api.call.transactionPaymentApi.queryInfo(transaction.toHex(), undefined, undefined);

    // Get the estimated weight
    const gasLimit = paymentInfo.weight;

    // Get the current gas price
    const gasPrice = await api.query.transactionPayment.nextFeeMultiplier();
    // Convert the gas price to a BigUint
    const gasPriceUint = BigInt(gasPrice.toString());

    // Calculate the estimated fee
    const estimatedFee = gasPriceUint * BigInt(gasLimit.toString());

    // Return the estimation results
    return { gasPrice, gasLimit, estimatedFee };
}

async function main() {
    const wsProvider = new WsProvider('wss://ws.turing.avail.tools');
    const api = await ApiPromise.create({ provider: wsProvider, chainId: 22023 });

    // Create your transaction object (e.g., transfer, staking, etc.)
    const transaction = api.tx.balances.transfer(
        "RECIPIENT_ADDRESS", // Replace with the actual recipient address
        "1000000000000" // Replace with the desired transfer amount (in base units)
    );

    const { gasPrice, gasLimit, estimatedFee } = await estimateGas(api, transaction);
    
    // Avail uses pico AVAX as the smallest unit
    console.log('Estimated Gas Price:', gasPrice.toString(), 'pico AVAX');
    console.log('Estimated Gas Limit:', gasLimit.toString());
    console.log('Estimated Fee:', estimatedFee.toString(), 'pico AVAX');

    await api.disconnect(); // Disconnect from the provider
}

main().catch(console.error);
