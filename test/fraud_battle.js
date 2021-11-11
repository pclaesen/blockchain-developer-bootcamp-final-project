const fraudBattle = artifacts.require("fraudBattle");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("fraudBattle", function (/* accounts */) {
  it("should assert true", async function () {
    await fraudBattle.deployed();
    return assert.isTrue(true);
  });
  
  it("should have a wallet connected"), async function () {
    const instance = await fraudBattle.deployed();
    const balance = await instance.getBalance.call(accounts[0]);
    assert.equal(balance.valueOf(), 1)
  }


});
