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

<div className="Card">

<Card style={{padding: "30px"}}>
  <h3>Create Wallet</h3>
  <h5> Decsribption of steps to create</h5>
  <div style={{margin: "30px"}}>
    <div>
      <div style={{paddingTop: "3vh"}} className="create">
        <h3> Create</h3>
        <p> this is how to create</p>
        <div>
          <a>
            <span>Click to create</span>
          </a>
        </div>
      </div>
      <div className="import" style={{paddingLeft: '30 20vh'}}>
        <h3> Import wallet</h3>
        <p> this is how to import wallet</p>
        <div>
          <a>
            <span>Click to import</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</Card>
</div>

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
    </div>
  );
}

export default Wallet;
