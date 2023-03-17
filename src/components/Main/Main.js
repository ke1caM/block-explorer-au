import React from "react";
import { useState, useEffect } from "react";
import "./main.css";
import "../Transaction/Transaction.js";
import Transaction from "../Transaction/Transaction.js";

export default function Main(props) {
  const [etherPrice, setEtherPrice] = useState();

  useEffect(() => {
    async function getEtherPrice() {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      let data = await response.json();
      let etherPrice = data.ethereum.usd;
      setEtherPrice(etherPrice);
    }
    getEtherPrice();
  }, []);

  let transactionsArray;

  if (props.blockDetails) {
    transactionsArray = props.blockDetails.transactions.map((tx) => {
      return (
        <Transaction
          etherPrice={etherPrice}
          txHash={tx.hash}
          key={tx.hash}
          to={tx.to}
          from={tx.from}
          nonce={tx.nonce}
          gasPrice={tx.gasPrice._hex}
          value={tx.value._hex}
          setAddressValue={props.setAddressValue}
        />
      );
    });
  }

  function handleClickBlockNumber() {
    props.setAddressValue(props.blockNumber);
  }

  const AddressUI = (
    <div className="main__panel">
      <div className="main__addressDiv">
        <h2 className="address__placeholder">Address: {props.addressValue}</h2>
        <hr />
      </div>
      <div className="balance__info">
        <h2 className="padding__30">
          Ether Balance: {parseInt(props.addressBalance) / 10 ** 18}
        </h2>
        <hr />
        <h2 className="padding__30">
          Ether Value: ${" "}
          {etherPrice
            ? Math.round(props.addressBalance / 10 ** 18) * etherPrice
            : ""}
        </h2>
      </div>
    </div>
  );

  const BlockUI = (
    <div className="main__panel">
      <div className="main__addressDiv">
        <h2 className="address__placeholder">
          Block Number: {props.addressValue}
        </h2>
        <hr />
      </div>
      <div className="block__info">
        <h2 className="padding__30">
          Hash:{" "}
          {props.blockDetails &&
          props.addressValue !== "Invalid Address or Block Number"
            ? props.blockDetails.hash
            : ""}
        </h2>
        <hr />
        <h2 className="padding__30 block__transactions">
          Transactions: {props.blockDetails ? transactionsArray.length : ""}
          {props.blockDetails ? transactionsArray : ""}
        </h2>
      </div>
    </div>
  );

  return (
    <div>
      <div className="main__info">
        <div className="main__placeholder">
          <h1 className="info__h1">Latest Block</h1>
          <p
            className="info__paragraph blockNumber__paragraph"
            onClick={handleClickBlockNumber}
          >
            {props.blockNumber}
          </p>
        </div>
        <div className="main__placeholder">
          <h1 className="info__h1">Ether Price</h1>
          <p className="info__paragraph">${etherPrice}</p>
        </div>
        <div className="main__placeholder">
          <h1 className="info__h1">Gas Price</h1>
          <p className="info__paragraph">{props.gasPrice} gwei</p>
        </div>
      </div>
      {props.addressValue.length === 42 ? AddressUI : BlockUI}
    </div>
  );
}
