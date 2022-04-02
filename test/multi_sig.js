const { ethers} = require('hardhat');
const { chai } = require("chai");


// const { hre } = 
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
describe("MultiSigWallet", function ( accounts ) {
  let wallet, owner , deployer, hacker;
  beforeEach(async () => {
    [owner, deployer, hacker ] = await ethers.getSigners();
    const MultiSigWallet = require("../artifacts/contracts/MultiSigWallet.sol/MultiSigWallet.json");
    wallet = await MultiSigWallet.deploy([owner.address, deployer], 2);
    await wallet.deployed();
  });
  it("should assert true", async function () {
    await MultiSigWallet.deployed();
    return assert.isTrue(true);
  });
});
