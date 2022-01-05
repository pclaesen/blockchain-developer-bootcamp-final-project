// const { assert } = require("console");
var assert = require('assert');

const fraudBattle = artifacts.require("fraudBattle");
const ERR_NOT_OWNER = "Ownable: caller is not the owner";
const ERR_NOT_A_BANK = "AccesControl: caller does not have the appropriate role of 'bank'";
const ERR_NOT_A_BUSINESS = "AccesControl: caller does not have the appropriate role of 'business'";
const ERR_NOT_ENOUGH_SIGNATURES = "This company number doesn't have 3 different signatures";

const getErrorObj = (obj = {}) => {
  const txHash = Object.keys(obj)[0];
  return obj[txHash];
};


contract("fraudBattle", function (accounts) {
  
  it("should be able to add a bank user as contract owner", async () => {  
    //accounts[0] is the contract owner 
    //accounts[5] will be added as bank user -> needed later on in the testing
    const instance = await fraudBattle.deployed(); 
    await instance.addBankUser(accounts[5], "HSBC", {from: accounts[0]});
    return true;
  })

  it("should prevent non-contract owners to add a bank user", async () => {
    //check the node instance to see the error ERR_NOT_OWNER
    const instance = await fraudBattle.deployed(); 
    
    try {
      await instance.addBankUser(accounts[5], "HSBC", {from: accounts[1]});
    } catch (e) {
      const { error, reason } = getErrorObj(e.data);
      assert.equal(error, "revert");
      assert.equal(reason, ERR_NOT_OWNER);
    }
  });

  it("should be able to add a business as contract owner/government", async () => {
    //As mentioned in the README.md file, the contract owner has the role of government, for ease of use
    const instance = await fraudBattle.deployed(); 

    try {
      await instance.addBusiness(accounts[9], "CONSENSYS", "UK12345", "987654321", "HSBC", {from: accounts[0]});
    } catch (e) {
      const { error, reason } = getErrorObj(e.data);
      assert.equal(error, "revert");
      assert.equal(reason, ERR_NOT_OWNER);
    }
  });

  it("should allow bank users to confirm the combination of bank account and company number, in the role of 'Bank", async () => {
    
    const instance = await fraudBattle.deployed(); 
    //accounts[5] was added in a previous test, this account has the role of bank user
    try {
      await instance.bankSignature("987654321", "UK12345", {from: accounts[5]});
    } catch (e) {
      const { error, reason } = getErrorObj(e.data);
      assert.equal(error, "revert");
      assert.equal(reason, ERR_NOT_A_BANK);
    }
  });

  it("should allow businesses to confirm their own combination of bank account and company number, in the role of 'business", async () => {
    
    const instance = await fraudBattle.deployed(); 
    //accounts[9] was added in a previous test, this account has the role of business user
    try {
      await instance.busSignature("987654321", "UK12345", {from: accounts[9]});
    } catch (e) {
      const { error, reason } = getErrorObj(e.data);
      assert.equal(error, "revert");
      assert.equal(reason, ERR_NOT_A_BUSINESS);
    }
  });

  it("should allow the government(contract owner for ease of use) to confirm the combination of bank account and company number, in the role of 'Owner'", async () => {
    
    const instance = await fraudBattle.deployed(); 
    //accounts[0] is the contract owner
    try {
      await instance.govSignature("987654321", "UK12345", {from: accounts[0]});
    } catch (e) {
      const { error, reason } = getErrorObj(e.data);
      assert.equal(error, "revert");
      assert.equal(reason, ERR_NOT_A_BUSINESS);
    }
  });



  it("should return a valid bank account for a company number, on the condition that this company number and the corresponding bank account have 3 different signatures (government/owner, bank, business)", async () => {
    const instance = await fraudBattle.deployed(); 
    //accounts[4] is a 'new' user in these tests, so basically a regular user. They should be able to provide a company number and retreive a valid bank account number.
    try {
      await instance.getValidBankAccount("987654321", {from: accounts[4]});
    } catch (e) {
      const { error, reason } = getErrorObj(e.data);
      assert.equal(error, "revert");
      assert.equal(reason, ERR_NOT_ENOUGH_SIGNATURES);
    }
    
    
  });


    
  
 
  
})