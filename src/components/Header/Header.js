import React from "react";
import "./header.css";

export default function Header(props) {
  function handleSubmit(event) {
    event.preventDefault();
    if (props.address.length === 42) {
      props.setAddressValue(props.address);
    } else if (props.address <= props.blockNumber) {
      props.setAddressValue(props.address);
    } else {
      props.setAddressValue("Invalid Address or Block Number");
    }
  }

  return (
    <div className="header__navbar" onSubmit={handleSubmit}>
      <div>
        <h1 className="header__logo">Block Explorer</h1>
      </div>
      <div className="header__links-container">
        <form className="header__form">
          <input
            className="header__searchbar"
            type="text"
            placeholder="Search by Address or Block Number"
            value={props.address}
            onChange={(event) => props.setAddress(event.target.value)}
          />
          <button className="header__submit">
            <i className="fa-solid fa-magnifying-glass fa-xs"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
