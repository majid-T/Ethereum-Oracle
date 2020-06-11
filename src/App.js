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
        if (data === undefined) {
          return;
        }
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
    console.log("Setting from Address :" + accounts[0]);

    const tx = await stockOracle.methods
      .setStock(
        web3.utils.fromAscii(symbol),
        Math.round(Number(price) * 10000),
        Number(volume)
      )
      .send({ from: contractOwner });
  };

  //Calling the oracle to see if data was persisted successfuly
  const getFromOracle = async () => {
    accounts = await web3.eth.getAccounts();
    //This is true if you deploy on ganache using first available account
    let contractOwner = accounts[0];
    console.log("getting info from address :" + accounts[0]);

    stockOracle.methods
      .getStockPrice(web3.utils.fromAscii(symbol))
      .call({ from: contractOwner })
      .then((oraclePrice) => {
        setOraclePrice(oraclePrice);
      });

    stockOracle.methods
      .getStockVolume(web3.utils.fromAscii(symbol))
      .call({ from: contractOwner })
      .then((oracleVolume) => {
        setOracleVolume(oracleVolume);
      });
  };

  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <hr />
        <h1>Stock Oracle DAPP</h1>
        <div className="row">
          <div className="col-sm">
            <input
              type="text"
              className="form-control"
              placeholder="type the symbol to fetch"
              onChange={(event) => setSymbol(event.target.value)}
            ></input>
            <hr />
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={getFromApi}
            >
              Get price from API
            </button>
            <button
              className="btn btn-primary btn-lg btn-block"
              onClick={setOracle}
            >
              Set the Oracle
            </button>
            <button
              className="btn btn-primary btn-lg btn-block"
              onClick={getFromOracle}
            >
              Get price from Oracle
            </button>
          </div>
          <div className="col-sm">
            <div className="card text-white bg-primary mb-3">
              <div className="card-header">Data From API</div>
              <div className="card-body">
                <h4 className="card-title">Stock details</h4>
                <p className="card-text">
                  Symbol: {symbol} <br />
                  Price : {price} <br /> Volume: {volume}
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm">
            <div className="card text-white bg-info mb-3">
              <div className="card-header">Data from Oracle</div>
              <div className="card-body">
                <h4 className="card-title">Oracle Stock details</h4>
                <p className="card-text">
                  Symbol: {symbol} <br />
                  Oracle Price: {oraclePrice} <br /> Oracle Valume:
                  {oracleVolume}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
