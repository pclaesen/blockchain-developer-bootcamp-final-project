// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract fraudBattle {
  constructor() public {
    // address government "0x1D119A6929B1FCBaC8BeA4c610998f9Dfcaf184d" public; //we'll only use 1 gov. address for the scope of this final project
  }


  struct Banks {
    address _addressBank;
    string _name;
  }

  struct Businesses {
    address _addressBus;
    string _name;
    string _bankAccount;
    uint _companyNumber;
    string _bankName;
  }

  
  //create bank array, other arrays to be added
  Banks[] private bankArray;
  Businesses[] private businessesArray;

  modifier bankOnly(address _bankAddress) {
    for (uint i = 0; i < bankArray.length; i++) {
      require (bankArray[i]._addressBank == _bankAddress);
        revert();
      _;
    }
  }

  function addBankUser(address _address, string memory _registeredName) public {    
    Banks memory banksData = Banks(_address, _registeredName);
    bankArray.push(banksData);
  }

  function addBusiness(address _address, string memory _name, string memory _bankAccount, uint _companyNumber, string memory _bankName) public {
    Businesses memory busData = Businesses(_address, _name, _bankAccount, _companyNumber, _bankName);
    businessesArray.push(busData);
  }

  //3 parties need to sign a transaction to add the bank account and business name to a new array.
  //This public array can be called with an API call
  function bankSignature(uint _providedCompanyNumber, address _providedBankAddress) public view bankOnly(_providedBankAddress) {
    
    uint businessesLength = businessesArray.length;
    for (uint i = 0; i < businessesLength; i++) {
      // if (_vatNumber == businessesArray[i]._vatNumber) {

      // }
    }


  }




}
