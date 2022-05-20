import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import "../App.css";
import Wallet from "./Wallet";
import NavBar from "./NavBar";

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

  const NavStyle = {
    fontSize: "21px",
    backgroundColor: "black",
  };

  return (
    <div className="App">
      <NavBar/>
      <div style={{}}>
        <ul style={NavStyle}>
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
            
          </li>
          
        </ul>
        {/* <Wallet/> */}
      </div>
    </div>
  );
}

export default Nav;
