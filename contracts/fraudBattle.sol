// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract fraudBattle {
  constructor() public {
  }


  struct Banks {
    address _addressBank;
    string _name;
    

  }

  //create bank array
  Banks banks;

  function addUser(address _address, string memory _name) public {
    banks = Banks(_address, _name);
  }





}
