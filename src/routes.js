const req = require("express/lib/request");
const res = require("express/lib/response");
const { modules } = require("web3");

function routes(app, getAccounts, walletList) {
    app.get('/wallet', async (req, res) => {
        let cache = [];
        const COUNTER = await walletList.methods.count().call();

        for (let i = 1; i <= COUNTER; i++) {
            const wallet = await walletList.methods.wallet(i).call();
            cache = [...cache, wallet];
        }
        res.json(cache);
    });
}

module.exports = routes