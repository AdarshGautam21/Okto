// const { HttpProvider, ApiPromise, Keyring } = require('avail-js-sdk');
const { Keyring } = require('@polkadot/keyring');
const { ApiPromise, HttpProvider } = require('@polkadot/api');

require('dotenv').config();

async function fetchBalance(address) {
  const httpProvider = new HttpProvider(process.env.HTTP_ENDPOINT);
  const api = await ApiPromise.create({ provider: httpProvider });

  try {
    // Fetch account info
    const accountInfo = await api.query.system.account(address);
    const { data: { free: balance } } = accountInfo;

    console.log("Balance before transfer:", balance.toString());
    return balance;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  } finally {
    await api.disconnect();
  }
}

async function transferNativeToken(sender, recipient, amount) {
  const httpProvider = new HttpProvider(process.env.HTTP_ENDPOINT);
  const api = await ApiPromise.create({ provider: httpProvider });

  try {
    // Create a keyring instance
    const keyring = new Keyring({ type: 'sr25519' });

    // Load sender's key pair
    const senderPair = keyring.createFromUri(process.env.SENDER_PRIVATE_KEY);

    // Create and send a transfer
    const tx = await api.tx.balances.transfer(recipient, amount).paymentInfo(sender);
    const hash = await tx.signAndSend(senderPair);

    console.log("Transfer hash:", hash.toString());
  } catch (error) {
    console.error("Error transferring tokens:", error);
    throw error;
  } finally {
    await api.disconnect();
  }
}

async function main() {
  try {
    const sender = process.env.SENDER_ADDRESS;
    const recipient = process.env.RECIPIENT_ADDRESS;
    const amount = 1000000000; // Amount in Plancks (smallest unit of AVA)

    // Fetch balance before transfer
    const balanceBefore = await fetchBalance(sender);

    // Transfer native tokens
    await transferNativeToken(sender, recipient, amount);

    // Fetch balance after transfer
    const balanceAfter = await fetchBalance(sender);

    // Calculate change in balance
    const balanceChange = balanceAfter.sub(balanceBefore);

    console.log("Balance change:", balanceChange.toString());
  } catch (error) {
    console.error("Error:", error);
  }
}

main();