# Avail Blockchain Architecture

## Structure of the Blockchain

Avail is a Layer 2 (L2) blockchain on Ethereum, designed to enhance the capabilities of the Ethereum network. Although it operates as a separate chain, it leverages Ethereum's security and consensus mechanisms for certain aspects.

### Block Structure

- **Data Blocks:** Avail's primary function is to ensure data availability. Each block contains transaction data and data availability proofs. These proofs guarantee that the data within the block is accessible for verification by the Ethereum network.
- **Block Ordering:** Blocks are connected sequentially, with each block referencing the previous block's hash, maintaining a chain-like structure. This ensures the immutability of the data stored on Avail.

### Lowest Unit of State Change

The lowest unit recording a state change in Avail is a transaction. Transactions include details about the sender, recipient, amount of tokens transferred, and any additional data relevant to the transaction.

## Consensus Mechanism and Rewards

### Consensus Mechanism

Avail leverages Ethereum's consensus mechanism for security, meaning its security is ultimately backed by the decentralized network of validators that secure Ethereum.

### Reward Mechanism for Validators

The specifics of Avail's reward mechanism are still under development. Validators are expected to be incentivized for maintaining the network through rewards earned for participating in data availability sampling and block production.

## Known Attacks on Avail

### Data Withholding Attacks

A potential attack vector is data withholding, where a node intentionally refuses to share data. Avail's data availability sampling protocol mitigates this risk by requiring nodes to prove data availability through random sampling.

### 51% Attack

Since Avail relies on Ethereum's security, it is not directly susceptible to 51% attacks. However, a successful 51% attack on Ethereum could theoretically compromise Avail's security as well.

## Chain Reorgs and Block Times

Avail aims to minimize chain reorganizations (reorgs). However, it might be indirectly affected by reorgs on the Ethereum network. The average block interval and confirmation time on Avail are still being optimized.

## Avail VM Design and Architecture

Avail is compatible with the Ethereum Virtual Machine (EVM), allowing Ethereum smart contracts to be deployed and executed on Avail without significant modifications.

## Gas or Transaction Fee on Avail

Avail utilizes a concept similar to gas fees on Ethereum to compensate validators. The exact calculation of gas fees and the native token used for payment are still being determined as Avail is in active development.

## Token Standards on Avail

Since Avail is EVM-compatible, it supports the same token standards as Ethereum, including:
- ERC-20 (fungible tokens)
- ERC-721 (non-fungible tokens)
- ERC-1155 (semi-fungible tokens)

These tokens can be seamlessly transferred between Ethereum and Avail.

## Popular Tokens on Avail

Currently, Avail is in its testnet phase, so the ecosystem of tokens is still evolving. It is expected that popular Ethereum tokens like USDC, USDT, and WETH will be widely used on Avail once it launches on mainnet.

## Replay Attacks and Nonce

Avail likely implements mechanisms to prevent replay attacks, such as sequence numbers or nonces, similar to Ethereum. This ensures that each transaction is unique and cannot be replayed to manipulate the network. Refer to Avail's official documentation for the most accurate information.

## Transaction Lifecycle

1. **Transaction Submission:** A user submits a transaction to an Avail node.
2. **Data Availability Sampling:** The node verifies the availability of the transaction data using the DAS protocol.
3. **Block Inclusion:** The transaction is included in a block on the Avail chain.
4. **Ethereum Verification:** The data availability proofs for the block are submitted to Ethereum for verification.
5. **Transaction Finality:** Once the data availability proofs are verified on Ethereum, the transaction is considered final on Avail.

For more information, please refer to the [Avail Documentation](https://github.com/availproject/avail).
