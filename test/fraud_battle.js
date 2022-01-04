const { assert } = require("console");

const fraudBattle = artifacts.require("fraudBattle");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("fraudBattle", function (accounts) {
  it("should be deployed", () => {
    fraudBattle.deployed;
    return true;
  })

  it("should be able to add a bank user", async () => {   
    const instance = await fraudBattle.deployed(); 
    await instance.addBankUser("0x90E26728604380a06Ab009E3E8a8405348410C79", "HSBC");
    return true;
  })

  it("should prevent non-contract owners to add a bank user", async () => {
    var contractOwner = accounts[0];
    const instance = await fraudBattle.deployed(); 
    await instance.addBankUser("0x90E26728604380a06Ab009E3E8a8405348410C79", "HSBC"), {from: contractOwner};
    
    return true;
  })
  
})