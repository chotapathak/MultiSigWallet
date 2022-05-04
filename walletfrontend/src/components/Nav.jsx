import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import "../App.css";
import Wallet from "./Wallet";

function Nav() {
  const [wallets, setWallet] = useState([]);

  useEffect(() => {
    async function fetcher() {
      const res = await fetch("htts://localhost:3001/wallet");
      const wallets = await res.json();
      setWallet(wallets);
    }
    fetcher();
  }, []);

  const GnosisNav = {
    fontSize: "18px",
    height: "30px",
    backgroundColor: "orange",
    topLeft: "20%"
  };

  return (
    <div className="App">
      <div>
        <ul>
          <li>
          <a className="brand-logo">
        <i class="wallet-icons">Logo</i>
        </a>
          </li>
          <li>
            <a className="home" href="#home">
              Home
            </a>
          </li>
          <li>
            <a href="#accounts">Accounts</a>
          </li>
          <li>
            <a href="#balance">History</a>
          </li>
          
          <li  style={{  margin: "14px 16px"}} className="networks">
            <Wallet/>
          </li>
        </ul>
        
      </div>
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
    </div>
  );
}

export default Nav;
