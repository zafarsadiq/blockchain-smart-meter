const smartMeter = artifacts.require("SmartMeter");

module.exports = function (deployer) {
  deployer.deploy(smartMeter);
};
