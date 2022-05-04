import React, { useState } from "react";
import { ethers } from "ethers";
// import "./Ccon.jsx";
import { Button, Card } from "@mui/material";

function Wallet() {
  // usetstate for storing and retrieving wallet details

  const [radioValue, setRadioValue] = useState("ETHEREUM");
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });

  const onRadioChange = (e) => {
    setRadioValue(e.target.value);
  };
  const btnhandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };
  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = (address) => {
    // Requesting balance method
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance) => {
        // Setting balance
        setdata({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };
  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
    });
    // Setting a balance
    getbalance(account);
  };

  return (
    <div className="wallet">
      {/* Calling all values which we
	have stored in usestate */}
      <div className="connect-button">
        <Card>
          <Button onClick={btnhandler} variant="primary">
            Connect
          </Button>

          <strong>Balance: </strong>
          {data.Balance}

          <strong> Address: </strong>
          {data.address}
        </Card>
      </div>
      <div
        style={{ margin: "20px", padding: "20px" }}
        className="create-container"
      >
        <select
          id="token"
          name="currency"
          onChange={onRadioChange}
          value={radioValue}
        >
          <option value="mainnet">Mainnet-Ethereum</option>
          <option value="testnet">Rinkeby</option>
          <option value="ada">Cardano</option>
          <option value="local">Local</option>
        </select>
      </div>
    </div>
  );
}

export default Wallet;
