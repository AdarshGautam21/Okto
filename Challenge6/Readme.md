<h2>Errors Encountered in Avail Blockchain Transactions:</h2>

**1. Insufficient Balance:**

* **Error:** "Insufficient funds for gas * price + value"
* **Reason:** The account attempting the transaction does not have enough tokens to cover the gas fee (calculated as gas limit * gas price) and the value being transferred.

**2. Lower Gas Price:**

* **Error:** "Transaction underpriced" or "below base fee"
* **Reason:** The gas price set in the transaction is too low compared to the network's minimum or current average. This can result in the transaction being delayed or not included in a block at all.

**3. Lower Gas Limit:**

* **Error:** "Out of gas"
* **Reason:** The gas limit set is insufficient to complete the transaction's execution. This means the computation required by the transaction exceeds the allocated gas.

**4. Higher Nonce/Sequence Number:**

* **Error:** "Nonce too high" or "invalid nonce"
* **Reason:** The nonce is a counter for transactions from an account. Each transaction must have a sequential nonce. A higher nonce indicates a transaction out of order and will be rejected.

**5. Lower Nonce/Sequence Number:**

* **Error:** "Nonce too low"
* **Reason:** Similar to the previous case, a lower nonce indicates a transaction has already been processed and will be rejected as a replay attempt.

**6. Account Not Initialized:**

* **Error:** "Account not found" or "account does not exist"
* **Reason:** The account specified in the transaction has not yet been created on the blockchain or has been deleted.

**7. Different Signer:**

* **Error:** "Invalid signature"
* **Reason:** The transaction was signed by an unexpected account, different from the one intended to authorize the transaction.

**8. Multiple Signers:**

* **More Than Required Signers:** This is generally not an error. If a transaction requires multiple signatures, exceeding that number won't invalidate the transaction.
* **Less Than Required Signers:**
    * **Error:** "Insufficient signatures"
    * **Reason:** The transaction does not meet the minimum number of required signatures to be considered valid.

**Additional Relevant Errors:**

* **Invalid Recipient Address:** The recipient address is malformed or does not exist.
* **Contract Reverted:** The execution of a smart contract transaction failed due to an internal error or condition.
* **Block Gas Limit Exceeded:** The total gas used by all transactions in a block exceeds the block's gas limit.

**Mitigation:**

* Ensure sufficient balance for gas and value.
* Use appropriate gas price estimates from tools like AvailScan.
* Accurately estimate the required gas limit for your transaction.
* Maintain correct nonce values for your transactions.
* Verify account initialization and existence.
* Double-check the signer's address.
* Ensure the correct number of signers for multi-signature transactions.



# Avail.js Error Messages

This document provides a reference for common error messages you might encounter when interacting with the Avail blockchain using the Avail-js-sdk.

## Transaction Errors

| Error Message                                                  | Reason                                                                                                                                          |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `InsufficientBalance: <value>`                             | The account attempting the transaction lacks sufficient tokens to cover the gas fee and the value being transferred.                            |
| `Invalid Transaction: Transaction is outdated`                | The gas price set in the transaction is too low compared to the network's minimum or current average.                                             |
| `DispatchError:: OutOfGas: 0`                                 | The gas limit set is insufficient for the computation required by the transaction.                                                                 |
| `Invalid Transaction: Next transaction nonce must be <value>` | The nonce (transaction counter) is out of order (higher than expected).                                                                         |
| `Invalid Transaction: Nonce is invalid`                        | The nonce is too low, indicating the transaction might be a replay attempt.                                                                    |
| `AccountInfo:: NotExists`                                      | The specified account is not yet created or has been deleted.                                                                              |
| `Invalid Transaction: Transaction has a bad signature`         | The transaction was signed by an unexpected or incorrect account.                                                                               |
| `Invalid Transaction: Not enough signers`                     | The transaction doesn't have the minimum required signatures (for multi-signature transactions).                                                 |
| `Invalid decoded address length`                               | The recipient address in the transaction is malformed or invalid.                                                                              |
| `DispatchError:: Module(ModuleError{index: <index>, error: <error>})` | The smart contract execution failed due to an internal error. The specific module and error code will provide more details.                   |
| `Invalid Transaction: Block is full`                         | The total gas used by all transactions in a block exceeds the block's gas limit. Your transaction will be included in a subsequent block. |

**Important Note:** The exact error messages might vary slightly depending on the Avail-js-sdk and node versions. However, these examples should give you a good starting point for troubleshooting.



You can save this as an `.md` file (e.g., `AvailErrors.md`) and refer to it whenever you encounter these messages in your development process.


