# Understanding Avail's Block Time

The average block time on the Avail blockchain is not a fixed value. It is designed to be dynamic and adjusts based on network conditions.

## How Avail's Block Time Works

Avail uses a consensus mechanism called GRANDPA (GHOST-based Recursive Ancestor Deriving Prefix Agreement) along with BABE (Blind Assignment for Blockchain Extension).

### GRANDPA
- Responsible for finalizing blocks, ensuring their immutability.

### BABE
- Handles the creation of new blocks in a probabilistic way based on stake weight.

This combination allows for fast block production while maintaining the security of finality. The target block time is often around 6 seconds, but it can vary depending on factors like:

- **Network Congestion:** Higher transaction volume can lead to slightly longer block times.
- **Validator Participation:** The number of active validators and their stake can influence the block production rate.

## Estimating Average Block Time

While there's no single definitive value, you can estimate the average block time by observing the blockchain in real-time:

### Using RPC Call

1. **Query Latest Finalized Block:**
   ```javascript
   const latestFinalizedBlock = await api.rpc.chain.getFinalizedHead();
   ```

2. **Observe:**
   Note the block number and timestamp. Wait for a few blocks to be finalized.

3. **Calculate:**
   - Subtract the initial block number from the later block number to find the number of blocks produced.
   - Subtract the initial timestamp from the later timestamp to find the time elapsed.
   - Divide the time elapsed by the number of blocks to get an average block time.

### Example

```
Initial Block: 123456 at 10:00:00 AM
Later Block:   123500 at 10:06:30 AM
```

- Blocks Produced: 44
- Time Elapsed: 390 seconds
- Average Block Time: 390 / 44 ≈ 8.86 seconds

## Important Notes

- This is just a snapshot in time. The average block time can fluctuate.
- For a more accurate average, you can calculate it over a larger number of blocks or use specialized tools that track block times.
- Avail's documentation may provide additional insights or updated target block time information.

---

By understanding and estimating the block time, developers and users of Avail can better anticipate network performance and make more informed decisions regarding their interactions with the blockchain.