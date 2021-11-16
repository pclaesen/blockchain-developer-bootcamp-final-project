// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract fraudBattle {
  constructor() public {
    // address government "0x1D119A6929B1FCBaC8BeA4c610998f9Dfcaf184d" public; //we'll only use 1 gov. address for the scope of this final project
  }

  address private owner;

  mapping (address => bool) isBank;
  mapping (address => bool) isBusiness;
  mapping (uint => bool) isBankSigned;


  struct Banks  {
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

  struct validBusinesses {
    address _addressBus;
    string _name;
    string _bankAccount;
    uint _companyNumber;
    string _bankName;   
  }

 

  
  
  Banks[] private bankArray;
  Businesses[] private businessesArray;
  validBusinesses[] public validBusinessesArray;
  

  modifier bankOnly(address _bankAddress) {
    require (isBank[msg.sender],"Not a bank");
      _;
    }
  

  modifier onlyOwner() {
    require(msg.sender == owner);
      _;
  }

  function addBankUser(address _address, string memory _registeredName) onlyOwner public {    
    Banks memory banksData = Banks(_address, _registeredName);
    bankArray.push(banksData);
    isBank[_address] = true;
  }

  function addBusiness(address _address, string memory _name, string memory _bankAccount, uint _companyNumber, string memory _bankName) public {
    Businesses memory busData = Businesses(_address, _name, _bankAccount, _companyNumber, _bankName);
    businessesArray.push(busData);
    isBusiness[_address] = true;
  }

  //3 parties need to sign a transaction to add the bank account and business name to a new array.
  //This public array can be called with an API call
  function bankSignature(uint _providedCompanyNumber, address _providedBankAddress) bankOnly(_providedBankAddress) public {
    
    uint businessesLength = businessesArray.length;
    for (uint i = 0; i < businessesLength; i++) {
      if (_providedCompanyNumber == businessesArray[i]._companyNumber) {
        validBusinesses memory validBusData = validBusinesses(businessesArray[i]._addressBus, businessesArray[i]._name, businessesArray[i]._bankAccount, businessesArray[i]._companyNumber, businessesArray[i]._bankName);
        validBusinessesArray.push(validBusData);
        isBankSigned[businessesArray[i]._companyNumber] = true;
      }

    }

  }

//closing brace end of contract
}
