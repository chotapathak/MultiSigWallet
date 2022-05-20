// import React, { useState } from "react";
// // import { ethers } from "ethers";
// // create a component to interact with contract using ethers
// import multiSig from "./multisig.json";
// import Nav from "./components/Nav";

// function Contract() {
//   const [walletAddress, setWalletAddress] = useState("");
//   const [walletName, setWalletName] = useState("");
//   const [walletPassword, setWalletPassword] = useState("");
//   const [owners, setOwners] = useState("");
//   const [transactions, setTransactions] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isInteracting, setIsInteracting] = useState(false);
//   const [transactionCount, setTransactionCount] = useState(-1);

//   let provider;
//   const abi = multiSig.abi;
//   const contractAddress = multiSig.networks[1].address; // || process.env.REACT_APP_CONTRACT_ADDRESS;

//   const contract = new ethers.Contract(contractAddress, abi, provider);
//   // function to get the wallet address
//   const handleConnection = async () => {
//     const address = await contract.owner();
//     setOwners(address);
//     setIsLoading(true);

//     if (window.ethereum) {
//       setTransactions[[]];
//       provider = new ethers.providers.Web3provider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//       const signer = provider.getSigner();
//       console.log(signer);
//       setTransactions([]);
//       setWalletAddress(await signer.getAddress());
//     } else {
//       alert("Please install MetaMask");
//     }
//     setIsLoading(false);
//     // getAllData();
//   };

//   const handleDisconnect = async () => {
//     setWalletAddress("");
//   };

//   const getAllData = async () => {
//     // const address = await contract.owner();
//     // setOwners(address);
//     // setIsLoading(true);
//     // setTransaction([]);
//     // setWalletAddress(await contract.owner());
//     // setWalletName(await contract.name());
//     // setWalletPassword(await contract.password());
//     // setTransactionCount(await contract.transactionCount());
//     // setIsLoading(false);
//     if (window.ethereum) {
//       setTransactions[[]];
//       const provider = new ethers.providers.Web3provider(window.ethereum);
//       const signer = provider.getSigner();

//       const contractInstance = new ethers.Contract(
//         contractAddress,
//         abi,
//         signer
//       );
//       console.log("contractInstance", contractInstance);
//       setIsInteracting(true);

//       await contractInstance.getOwners().then((owners) => setOwners(owners));

//       await contractInstance
//         .transactionIndex()
//         .then(async (tIndex) => {
//           setTransactionCount(tIndex.toNumber());
//           for (let i = 0; i < tIndex.toNumber(); i++) {
//             await signer.getAddress().then((address) => {
//               console.log(address);
//               contractInstance
//                 .getApprovals(address, i)
//                 .then(async (approval) => {
//                   console.log(address, i, approval);
//                   await contractInstance.transactions(i).then(
//                     (transaction) => {
//                       console.log(transaction[0].toNumber());
//                       setTransactions((prevState) => [
//                         ...prevState,
//                         {
//                           id: transaction[0].toNumber(),
//                           to: transaction[1],
//                           amount: transaction[2].toNumber(),
//                           isSent: transaction[3],
//                           approvals: transaction[4].toNumber(),
//                           yourApproval: approval,
//                         },
//                       ]);
//                     }
//                     // console.log(transaction),
//                   );
//                 });
//             });
//           }
//         })
//         .then(() => setIsInteracting(false));
//     } else {
//       alert("Please install MetaMask");
//     }
//   };



//   return (
//     <div>
//       <Nav
//         walletAddress={walletAddress}
//         isLoading={isLoading}
//         // handleDisconnectToWallet={handleDisconnectToWallet}
//         handleConnectionToWallet={handleConnection}
//         getAllData={getAllData}
//       />
//       {walletAddress !== "" && (
//         <div style={{ margin: "auto" }}>
//           <div
//             style={{
//               fontSize: "20px",
//               width: "700px",
//               margin: "auto",
//               padding: "10px 1px",
//               borderRadius: "10px",
//               marginTop: "5px",
//               background: "#9C27B0",
//               fontWeight: "bold",
//               fontStyle: "italic",
//               color: "white",
//             }}
//           >
//             {isLoading ? (
//               <div>...Loading</div>
//             ) : (
//               <div>
//                 <span>
//                   {walletAddress === owners[0]
//                     ? "Owner-1"
//                     : walletAddress === owners[1]
//                     ? "Owner-2"
//                     : "User"}
//                 </span>
//                 <br />
//                 <span>{walletAddress}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//       {walletAddress === "" ? (
//         <div>
//           <span
//             style={{
//               fontSize: "40px",
//               fontWeight: "bold",
//             }}
//           >
//             Connect to MetaMask
//           </span>
//           <br />
//           <img
//             style={{ width: "300px" }}
//             src="./metamask.png"
//             alt="No Display"
//           />
//         </div>
//       ) : (
//         <h1>Body</h1>
//         // <Body
//         //   isEntaracting={isEntaracting}
//         //   owners={owners}
//         //   getAllData={getAllData}
//         //   createTransaction={createTransaction}
//         //   transactions={transactions}
//         //   isAOwner={owners.includes(walletAddress)}
//         //   handleApproveTransaction={handleApproveTransaction}
//         // />
//       )}
//     </div>
//   );
// }
