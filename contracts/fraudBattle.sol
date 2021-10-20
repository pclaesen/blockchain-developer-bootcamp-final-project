// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract fraudBattle {
  constructor() public {
    //address _government = 0x... //we'll only use 1 gov. address for the scope of this final project
  }


  struct Banks {
    address _addressBank;
    string _name;
  }

  struct Businesses {
    address _addressBus;
    string _name;
    string _bankAccount;
  }

  //create bank array, other arrays to be added
  Banks[] private bankArray;
  Businesses[] private busArray;

  function addBankUser(address _address, string memory _name) public {    
    Banks memory banksData = Banks(_address, _name);
    bankArray.push(banksData);
  }

  function submitBusiness(address _address, string memory _name, string memory _bankAccount) public {
    Businesses memory busData = Businesses(_address, _name, _bankAccount);
    busArray.push(busData);
  }

  //3 parties need to sign a transaction to add the bank account and business name to a new array.
  //this array can be called with an API call





}
