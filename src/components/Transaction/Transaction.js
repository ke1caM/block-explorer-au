import React from "react";
import { useState } from "react";
import "./transaction.css";

export default function Transaction(props) {
  const [showDetails, setShowDetails] = useState(false);

  function handleClick() {
    setShowDetails(!showDetails);
  }

  function handleSetAddressValueFrom() {
    props.setAddressValue(props.from);
  }

  function handleSetAddressValueTo() {
    props.setAddressValue(props.to);
  }

  return (
    <div className="transaction__container">
      <hr />
      <div className="icon__box">
        <div className="icon__icon">
          <i className="fa-solid fa-receipt fa-xl"></i>
        </div>
        <div onClick={handleClick} className="cursor__pointer">
          {props.txHash}
        </div>
      </div>
      {showDetails ? (
        <div className="transaction__details">
          <div className="cursor__pointer" onClick={handleSetAddressValueFrom}>
            From: {props.from}
          </div>
          <div className="cursor__pointer" onClick={handleSetAddressValueTo}>
            To: {props.to}
          </div>
          <div>Nonce: {props.nonce}</div>
          <div>Gas price: {parseInt(props.gasPrice) / 10 ** 9} gwei</div>
          <div>
            Value: {parseInt(props.value) / 10 ** 18} ether ($
            {Math.round((props.etherPrice * parseInt(props.value)) / 10 ** 18)})
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
