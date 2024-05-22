# Avail's Hybrid Consensus Mechanism

Avail uses a hybrid consensus mechanism that combines GRANDPA and BABE. This gives it two types of finality:

## Types of Finality

### 1. Probabilistic Finality (BABE)

- **Description:** Achieved quickly, usually within a few seconds (often targeted around 6 seconds). Provides a high probability that a block will not be reverted, but there's still a small chance of reversion.
- **Target Time:** Approximately 6 seconds.

### 2. Deterministic Finality (GRANDPA)

- **Description:** A more rigorous finality that takes longer. Once a block is deterministically finalized, it's considered completely immutable and cannot be reversed.
- **Typical Time:** 12-60 seconds based on network conditions and validator activity.

## References

- **Avail Official Blog:** Avail's blog posts and documentation mention a target block time of 6 seconds, implying that probabilistic finality is achieved around that time. However, they don't explicitly state the time for deterministic finality.
- **Curvegrid:** An article by Curvegrid mentions that Avail has "0.7-1s probabilistic transaction finality; 2-2.2s block finality".
- **Messari Report:** A Messari report on finality times states "6s probabilistic finality via BABE; 12-60s deterministic finality via GRANDPA" for Avail.

## Important Note

The exact time for deterministic finality can vary depending on network conditions and validator activity.

---

By understanding Avail's hybrid consensus mechanism and its finality types, developers and users can better anticipate the performance and reliability of their transactions on the Avail blockchain.