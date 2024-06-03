const { HttpProvider, ApiPromise } = require('avail-js-sdk');
require('dotenv').config();

async function fetchTransactionDetails(txHash) {
  try {
    const httpProvider = new HttpProvider(process.env.HTTP_ENDPOINT);
    const api = await ApiPromise.create({ provider: httpProvider });

    // Fetch events related to the transaction hash
    const events = await api.query.system.events.at(txHash);

    // Iterate over events and print relevant details
    events.forEach(({ event }) => {
      const eventName = event.method;
      const eventData = event.data.toJSON();

      console.log(`Event Name: ${eventName}`);
      console.log(`Event Data: ${JSON.stringify(eventData)}`);
    });
  } catch (error) {
    console.error("Error fetching transaction details:", error);
  }
}

// Replace 'your_tx_hash_here' with the actual transaction hash
const txHash = '0x547bc015b3a3c9bd89efe7c10bf60a6c95b4beb36d61288b383355fbdb7e4625';
fetchTransactionDetails(txHash);