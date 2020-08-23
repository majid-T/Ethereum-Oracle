## Student Lab for Design Patterns for Blockchain

Student majid shockoohi Id: 101284289
Some notes:

1. Solidity contract included in the root directry.
1. Oracle address will vary on each deployment.
1. If using ganache GUI, then you shoull change the port of blockchain network to 7545

![Lab screenshot](/screenShot.png)

## What is this repo?

We have simulated an Oracle in this peoject. A solidity smart contract StockOracle.sol has functions to set and get different stock prices. Then front end code with React.Js will fetch this prices from a 3rd party API and sets the prices on smart contract. Here we ued http://remix.ethereum.org/ and ganache CLI to setup an Ethereum environemnt. Front end code will use the ABI and deployed address of of the smart contract to intract with it.

### Technologies and tools used in this project

- [ReactJS](https://reactjs.org/) - Frontend javascript library
- [Bootstrap](https://getbootstrap.com/) - CSS library for responsive mobile first design
- [Solidity](https://solidity.readthedocs.io/en/v0.7.0/) - Programing language for Ethereum.
