```markdown
# How to Identify Token Transfer Details from Transaction Data on Avail

## Overview
This guide explains how to identify whether a token was transferred, and provides the necessary steps to extract details such as token name, type, transfer amount, and the involved addresses from transaction data on the Avail blockchain.

## Key Fields and Descriptions

| Field              | Description                                                                                                                                     | How to Identify from Transaction Data                                              |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| **Whether a token was transferred** | Check if the `callModule` field is `"Balances"` and the `callMethod` field is `"transfer"`.                                          | Yes, in this case, the `callModule` is `"Balances"` and `callMethod` is `"transfer"`. |
| **Token name**        | If the `callModule` is `"Balances"` and the `callMethod` is `"transfer"`, then the token transferred is likely the native token (uBAL) on Avail.   | The token name is uBAL since the `callModule` is `"Balances"` and `callMethod` is `"transfer"`. |
| **Token type**        | If the `callModule` is `"Balances"` and the `callMethod` is `"transfer"`, then the token transferred is the native token (uBAL) on Avail.          | The token type is native since the `callModule` is `"Balances"` and `callMethod` is `"transfer"`. |
| **Transfer amount**   | The transfer amount can be found in the `callArgs` field. The first argument (index 0) is usually the recipient address, and the second argument (index 1) is the transfer amount. | The transfer amount is 1000000000 (assuming uBAL) which is found in the second argument of the `callArgs` field. |
| **From address**      | The from address (sender) can be found in the `signer` field.                                                                                  | The from address is `0x0123456789abcdef` which is found in the `signer` field. |
| **To address**        | The to address (recipient) can be found in the first argument of the `callArgs` field.                                                         | The to address is `0xrecipient_address` which is found in the first argument of the `callArgs` field. |

## Example
Given a transaction with the following fields:

```json
{
  "callModule": "Balances",
  "callMethod": "transfer",
  "callArgs": [
    "0xrecipient_address",
    "1000000000"
  ],
  "signer": "0x0123456789abcdef"
}
```

1. **Whether a token was transferred:**
   - Check `callModule`: `"Balances"`
   - Check `callMethod`: `"transfer"`
   - **Result:** Yes, a token was transferred.

2. **Token name:**
   - Based on `callModule` and `callMethod`, the token transferred is likely uBAL.
   - **Result:** Token name is uBAL.

3. **Token type:**
   - Based on `callModule` and `callMethod`, the token transferred is the native token on Avail.
   - **Result:** Token type is native.

4. **Transfer amount:**
   - Extract from `callArgs` field, second argument (index 1).
   - **Result:** Transfer amount is 1000000000 uBAL.

5. **From address:**
   - Extract from `signer` field.
   - **Result:** From address is `0x0123456789abcdef`.

6. **To address:**
   - Extract from `callArgs` field, first argument (index 0).
   - **Result:** To address is `0xrecipient_address`.

## Conclusion
By following the steps outlined above, you can accurately identify and extract details about token transfers from transaction data on the Avail blockchain. This information is crucial for analyzing transaction flows and understanding asset movements within the network.
```