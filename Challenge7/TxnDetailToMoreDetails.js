// Replace with actual transaction data from Polkadot.js API
const transactionData = {
    hash: "0x1234567890abcdef",
    blockHash: "0xdeadbeefcafe1234",
    signer: "0x0123456789abcdef",
    method: {
        callIndex: "0x0500", // Assuming Balances.transfer call index
        args: [
            "0xrecipient_address",
            "1000000000" // Assuming uBAL
        ],
    }
};


function analyzeTransaction(txData) {
    // Check for Balances.transfer
    const isTransfer = txData.method.callIndex === "0x0500";
    
    if (isTransfer) {
        const amount = BigInt(txData.method.args[1]);
        const sender = txData.signer.toString();
        const recipient = txData.method.args[0].toString();

        console.log("Token transferred:", true);
        console.log("Token name:", "uBAL"); // Assuming native token for Balances.transfer
        console.log("Token type:", "Native Token");
        console.log("Transfer amount:", amount);
        console.log("From address:", sender);
        console.log("To address:", recipient);
    } else {
        console.log("Token transferred:", false);
    }
}

analyzeTransaction(transactionData);
