const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const Web3 = require('web3');
// const contract = require('@truffle/contract');
const artifacts = require('../build/contracts/MultiSigWallet.json');
const WALLET_ABI = require('./config');
const  WALLET_ADDRESS = require('./config');

app.use(cors());
app.use(express.json());


if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider); 
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

console.log('mongodb://127.0.0.1:27017/blockchain-node-api',
    {
            useUnifiedTopology: true,
    }, async (err, client) => {
    const db =client.db('Cluster0');
    const accounts = await web3.eth.getAccounts();
    const walletList = new web3.eth.Contract(WALLET_ABI.WALLET_ABI, WALLET_ADDRESS.WALLET_ADDRESS);
    
    routes(app,db,accounts, walletList);
    app.listen(process.env.PORT || 3001, () => {
            console.log('listening on port '+ (process.env.PORT || 3001));
    });
});
