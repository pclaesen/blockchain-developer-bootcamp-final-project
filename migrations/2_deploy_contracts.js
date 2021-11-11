const fraudBattle = artifacts.require("fraudBattle.sol");

module.exports = function (deployer) {
  deployer.deploy(fraudBattle);
};