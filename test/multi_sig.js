const MultiSig = artifacts.require("MultiSig");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MultiSig", function (/* accounts */) {
  it("should assert true", async function () {
    await MultiSig.deployed();
    return assert.isTrue(true);
  });
});
