import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import Wallet from "./Wallet";
import Button from "@mui/material/Button";

// import ReplayIcon from "@mui/icons-material/Replay";
const NavStyle = {
  fontSize: "21px",
  backgroundColor: "#0d160e",
};

export default function NavBar (
    walletAddress,
  isLoading,
  handleDisconnectToWallet,
  handleConnectToWallet,
  getAllData,
)
{
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            color: "grey",
            background: "black",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ fontSize: "61px", color: "#f1860c",fontFamily:'fantasy' }}
          >
           <b style={{padding:'30px'}}> Sig Wallet </b>
          </Typography>

          
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Button
                variant="contained"
                size="large"
                disabled={walletAddress === ""}
                onClick={getAllData}
                color="secondary"
                // startIcon={<ReplayIcon />}
              >
                Connect
              </Button>
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color='primary'
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() =>
                  walletAddress === ""
                    ? handleConnectToWallet()
                    : handleDisconnectToWallet()
                }
              >
                {walletAddress !== "" ? "LogOut" : "Login"}
              </Button>
            </IconButton>
          </div>

          
        </Toolbar>
        
      </AppBar>
      <div style={NavStyle}>
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
        
      </div>
    </Box>
  );
};