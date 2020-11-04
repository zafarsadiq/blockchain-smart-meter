pragma solidity ^0.5.0;

contract SmartMeter {
  int256 public bill;

  function set(int256  kwh) public {
    bill = kwh * 10;
  }

  function get() public view returns(int256) {
    return bill;
  }
}