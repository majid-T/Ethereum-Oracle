import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import { STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS } from "./quotecontract";

const apiKey = "7BGAIYXYURSQRIBI";
const port = 8545; // If using Ganache GUI use 7545 for port
const web3 = new Web3("http://localhost:" + port);

function App() {
  return (
    <div className="App">
      <div className="AppContent">
        <StockApp></StockApp>
      </div>
    </div>
  );
}

// Making the StockApp component
function StockApp() {
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState(0);
  const [volume, setVolume] = useState(0);
  const [oraclePrice, setOraclePrice] = useState("Not Defined");
  const [oracleVolume, setOracleVolume] = useState("Not Defined");

  let accounts = [];

  //Getting the contract from ganache by ABI and address
  const stockOracle = new web3.eth.Contract(
    STOCK_ORACLE_ABI,
    STOCK_ORACLE_ADDRESS
  );

  useEffect(() => {}, [symbol]);

  //Calling the web API fro the stock symbol
  const getFromApi = () => {
    //make sure there is a symbole defined
    if (!symbol) {
      console.log("No symbole defined!");
      return;
    }
    fetch(
      "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
        symbol +
        "&apikey=KEY"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data["Global Quote"]["05. price"]);
        setPrice(data["Global Quote"]["05. price"]);
        setVolume(data["Global Quote"]["06. volume"]);
      })
      .catch((err) => {
        console.error(err);
        setPrice(0);
        setVolume(0);
      });
  };

  //Setting smart contract with data received from web API
  const setOracle = async () => {
    if (!price && !volume) {
      console.log("No price and volume to set");
      return;
    }
    accounts = await web3.eth.getAccounts();
    //This is true if you deploy on ganache using first available account
    let contractOwner = accounts[0];
    console.log("Owner :" + accounts[0]);

    const tx = await stockOracle.methods
      .setStock(
        web3.utils.fromAscii(symbol),
        Math.round(Number(price) * 10000),
        Number(volume) * 10000
      )
      .send({ from: contractOwner });

    console.log(tx);
  };

  //Calling the oracle to see if data was persisted successfuly
  const getFromOracle = async () => {
    accounts = await web3.eth.getAccounts();
    //This is true if you deploy on ganache using first available account
    let contractOwner = accounts[0];
    console.log("Owner :" + accounts[0]);

    stockOracle.methods
      .getStockPrice(web3.utils.fromAscii(symbol))
      .call({ from: contractOwner })
      .then((oraclePrice) => {
        console.log(oraclePrice);
        setOraclePrice(oraclePrice);
      });

    stockOracle.methods
      .getStockVolume(web3.utils.fromAscii(symbol))
      .call({ from: contractOwner })
      .then((oracleVolume) => {
        console.log(oracleVolume);
        setOracleVolume(oracleVolume);
      });
  };

  return (
    <div>
      <h1>Stock Oracle DAPP</h1>
      <div>
        <input onChange={(event) => setSymbol(event.target.value)}></input>
        <button onClick={getFromApi}>Get Price</button>
        <span>
          {" "}
          Price : {price} | Volume: {volume}
        </span>
      </div>
      <div>
        <hr></hr>

        <span>
          Symbol: {symbol} | Price : {price} | Volume: {volume}
        </span>
        <br></br>
        <button onClick={setOracle}>Set the Oracle</button>
      </div>
      <div>
        <hr></hr>
        <button onClick={getFromOracle}>Get price from Oracle</button>
        <br></br>
        <span>
          Oracle Price: {oraclePrice} | Oracle Valume: {oracleVolume}
        </span>
      </div>
    </div>
  );
}

export default App;
