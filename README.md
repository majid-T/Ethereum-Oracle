## What is this repo?

We have simulated an Oracle in this project. A solidity smart contract StockOracle.sol has functions to set and get different stock prices. Then front end code with React.Js will fetch this prices from a 3rd party API and sets the prices on smart contract. Here we used http://remix.ethereum.org/ and ganache CLI to setup an Ethereum environment. Front end code will use the ABI and deployed address of the smart contract to interact with it.

![Lab screenshot](/screenShot.png)

Some notes:

1. Solidity contract included in the root directry.
1. Oracle address will vary on each deployment.
1. If using ganache GUI, then you shoull change the port of blockchain network to 7545

### Technologies and tools used in this project

- [ReactJS](https://reactjs.org/) - Frontend javascript library
- [Bootstrap](https://getbootstrap.com/) - CSS library for responsive mobile first design
- [Solidity](https://solidity.readthedocs.io/en/v0.7.0/) - Programing language for Ethereum.
