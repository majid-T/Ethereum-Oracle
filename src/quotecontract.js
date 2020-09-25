// This will hold the contract address, will change on every deployment
export const STOCK_ORACLE_ADDRESS =
  "0xB98be1e1821F3cB77f0610caBC8790E1986029e2";

//This is the contract ABI .
export const STOCK_ORACLE_ABI = [
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_symbol",
        type: "bytes4",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_volume",
        type: "uint256",
      },
    ],
    name: "setStock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_symbol",
        type: "bytes4",
      },
    ],
    name: "getStockPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_symbol",
        type: "bytes4",
      },
    ],
    name: "getStockVolume",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
