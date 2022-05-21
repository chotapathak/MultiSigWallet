import React, { useState } from "react";
import { ethers } from "ethers";
// import "./Ccon.jsx";
import { Button, Card, ListItemButton, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#9C27B0",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Wallet(transactions) {
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

        <img
          style={{ width: "100%", height: "600px" }}
          src="https://media.istockphoto.com/vectors/gem-icon-vector-id1368450818?k=20&m=1368450818&s=612x612&w=0&h=ZYVG8RkCtpieMMzDTBFSIGKdrVTgHDZCjGNjZYY-0Uc="
          alt="Display"
        />

        <Card style={{ padding: "20px" }}>
          <ListItemButton>
            <h2>Create Wallet</h2>
          </ListItemButton>
          <div style={{ margin: "6px" }}>
            <div>
              <div style={{ paddingTop: "3vh" }} className="create">
                <h3> Create</h3>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        value="Mainnet"
                        onChange={onRadioChange}
                      />
                      Mainnet
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Testnet"
                        onChange={onRadioChange}
                      />
                      Testnet
                    </label>
                  </div>
                  <div style={{ margin: "20px" }} className="wallet-details">
                    <TextField
                      id="outlined-basic"
                      label="Wallet Name"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Owner Address"
                      variant="outlined"
                      style={{ width: "100%", marginTop: "20px" }}
                    />
                    No of Signature
                    <input
                      id="outlined-basic"
                      label="Number of confirmation"
                      variant="outlined"
                      type={"number"}
                      style={{ margin: "6px", padding: "12px" }}
                    />
                    <div>
                      <span>
                        <Button>Click to create</Button>{" "}
                      </span>
                    </div>
                  </div>
                </form>
              </div>
              <div className="import" style={{ paddingLeft: "30 20vh" }}>
                <h3> Import wallet</h3>

                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <label>
                      <input
                        type="radio"
                        value="Mainnet"
                        onChange={onRadioChange}
                      />
                      Ethereum Mainnet
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Testnet"
                        onChange={onRadioChange}
                      />
                      Testnet
                    </label>
                  </div>
                  <TextField
                    value=""
                    label="Name"
                    variant="outlined"
                    onChange={(e) => e.target.value}
                  />
                  <TextField
                    value=""
                    label="Owner Address"
                    variant="outlined"
                    type="number"
                    onChange={(e) => e.target.value}
                  />
                </Box>
                <div>
                  <span>
                    <Button>Click to Import</Button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <Typography>
        <h3>Transactions History</h3>

        <TableContainer>
          <Table
            sx={{ width: 1200, margin: "auto" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Recipient</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Send or Not</StyledTableCell>
                <StyledTableCell>No. Of Approvals</StyledTableCell>

                <>
                  <StyledTableCell>Approved By You ?</StyledTableCell>
                  <StyledTableCell>Want to Approve</StyledTableCell>
                </>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {}
                </StyledTableCell>
                <StyledTableCell>0xf50fe.....</StyledTableCell>
                <StyledTableCell>3 ethers</StyledTableCell>
                <StyledTableCell>?</StyledTableCell>
                <StyledTableCell>3</StyledTableCell>

                <>
                  <StyledTableCell>NO</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      // disabled={row.yourApproval}
                      variant="outlined"
                    >
                      Approve
                    </Button>
                  </StyledTableCell>
                </>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Typography>
    </div>
  );
}

export default Wallet;
