<h1>Part B: Avail Node Providers and RPC Endpoints</h1>


<h2>
Node Providers:</h2>

Currently, Avail is in its testnet phase, and there are no dedicated node providers like Infura or Alchemy available yet. However, you can run your own node using the instructions provided in Avail's documentation: https://docs.availproject.org/

<h2>Public RPC and WS Endpoints:</h2>
Avail's testnet RPC endpoint is: wss://ws.testnet.avail.network

**Goldberg Testnet:** This Testnet is deprecated and uses the legendary AVL token name. This is in continuance with the old token name and will soon be removed.


**Turing Testnet:** Turing is the only testnet which has been updated by the Avail team and is currently using the new AVAIL token name, this will be maintained for the users and developers to launch their testnets. 




| Feature              | Turing Testnet                                   | Goldberg Testnet                                  |
| :------------------- | :------------------------------------------------ | :------------------------------------------------ |
| Status               | Active                                            | Deprecated                                        |
| AvailApps Explorer   | [https://explorer.avail.so/](https://explorer.avail.so/)                         | [https://explorer.avail.so/](https://explorer.avail.so/)                         |
| Subscan Explorer     | [https://avail-turing.subscan.io/](https://avail-turing.subscan.io/)                   | [https://avail-goldberg.subscan.io/](https://avail-goldberg.subscan.io/)                   |
| RPC Endpoint         | [https://turing-rpc.avail.so/rpc](https://turing-rpc.avail.so/rpc)                   | [https://goldberg.avail.tools/api](https://goldberg.avail.tools/api)                   |
| WS Endpoint          | wss://turing-rpc.avail.so/ws                      | wss://goldberg.avail.tools/ws                      |
| Chain Spec           | [https://github.com/availproject/avail/blob/main/misc/genesis/testnet.turing.chain.spec.raw.json](https://github.com/availproject/avail/blob/main/misc/genesis/testnet.turing.chain.spec.raw.json) | [https://github.com/availproject/avail/blob/main/misc/genesis/testnet.turing.chain.spec.raw.json](https://github.com/availproject/avail/blob/main/misc/genesis/testnet.turing.chain.spec.raw.json) |
    

**Avail does not currently provide a public HTTP RPC endpoint. You can access the network using the WebSocket endpoint or by running your own node.**

<h2>RPC Method Documentation:</h2>
Avail's JSON-RPC interface is compatible with Ethereum's JSON-RPC, so you can refer to the Ethereum JSON-RPC documentation for available methods: https://eth.wiki/json-rpc/API
