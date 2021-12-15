// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title B2B Fraud Battle
/// @author pclaesen
/// @notice Basic functionality works. For this final project, the contract owner also has the role of the government
/// @dev All function calls are currently implemented without side effects


contract fraudBattle is Ownable {
  
  
  
  mapping (address => bool) isBank;
  mapping (string => bool) isBankName;
  mapping (address => bool) isBusiness;
  mapping (uint => bool) isBankSigned;
  mapping (uint => bool) isBusSigned;
  mapping (uint => bool) isGovSigned;


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


  
  Banks[] public bankArray;
  Businesses[] public businessesArray;
    

  modifier bankOnly(address _bankAddress) {
    require (isBank[msg.sender],"Not a bank");
      _;
    }

  
  
  /// @dev Use this to lookup the current banks from the on-chain array.
  /// @return Returns the current banks as an array of objects, added by the contract owner.
  function getBankArray() public view returns(Banks[] memory) {
    return bankArray;
  }

  /// @dev Use this to lookup the current businesses from the on-chain array.
  /// @return Returns the current businesses as an array of objects, added by the government (contract owner for ease of use).
  function getBusinessArray() public view returns(Businesses[] memory) {
    return businessesArray;
  }

/// @notice This function adds a bank, only the contract owner can call this function.
/// @param _address: insert the banks wallet address that will be used to sign the company details
/// @param _registeredName: insert the name in capital letters
  function addBankUser(address _address, string memory _registeredName) public onlyOwner {    
    Banks memory banksData = Banks(_address, _registeredName);
    bankArray.push(banksData);
    isBank[_address] = true;
    isBankName[_registeredName] = true;
  }


/// @notice This function adds a business, only the contract owner (in the role of government for ease of use) can call this function.
/// @param _address: insert the business wallet address
/// @param _name: insert the official company name in capital letters
/// @param _bankAccount: insert the business' bank account in capital letters (if applicable)
/// @param _companyNumber: insert the unique company number
/// @param _bankName: insert the official bank name in capital letters
  function addBusiness(address _address, string memory _name, string memory _bankAccount, uint _companyNumber, string memory _bankName) public onlyOwner {
      require (isBankName[_bankName] == true, "Unknown bank name, or bank hasn't been registered yet");
    Businesses memory busData = Businesses(_address, _name, _bankAccount, _companyNumber, _bankName);
    businessesArray.push(busData);
    isBusiness[_address] = true;
  }

  /// @notice general: The 3 actors need to sign a transaction to add the bank account and business number to a new array. This new public array can be called with a JS call.
  /// @notice This function allows the bank to confirm and sign the business' name and bankaccount combination. Only an approved bank wallet address can use this function and sign the transaction. 
  /// @param _providedCompanyNumber insert the official company number
  /// @param _providedBankAccount insert the business' official bank account, make sure to use capital letters if applicable
  /// @dev Only uint is accepted for the _providedCompanyNumber parameter, make sure to limit the input in the fronted for better UX
  function bankSignature(uint _providedCompanyNumber, string memory _providedBankAccount) bankOnly(msg.sender) public {
    
    uint businessesLength = businessesArray.length;
    
    for (uint i = 0; i < businessesLength; i++) {
      require (_providedCompanyNumber == businessesArray[i]._companyNumber && keccak256(abi.encodePacked(_providedBankAccount)) == keccak256(abi.encodePacked(businessesArray[i]._bankAccount)), "Unknown companynumber or bank account");
        isBankSigned[businessesArray[i]._companyNumber] = true;
     }

  }


  /// @notice general: The 3 actors need to sign a transaction to add the bank account and business number to a new array. This new public array can be called with a JS call.
  /// @notice This function allows the bank to confirm and sign the business' name and bankaccount combination. Only an approved bank wallet address can use this function and sign the transaction. 
  /// @param _providedCompanyNumber insert the official company number
  /// @param _providedBankAccount insert the business' official bank account, make sure to use capital letters if applicable
  /// @dev Only uint is accepted for the _providedCompanyNumber parameter, make sure to limit the input in the fronted for better UX
  function busSignature(uint _providedCompanyNumber, string memory _providedBankAccount) public {
    
    uint businessesLength = businessesArray.length;
    for (uint i = 0; i < businessesLength; i++) {
      require (_providedCompanyNumber == businessesArray[i]._companyNumber && msg.sender == businessesArray[i]._addressBus && keccak256(abi.encodePacked(_providedBankAccount)) == keccak256(abi.encodePacked(businessesArray[i]._bankAccount)), "Unknown companynumber or bank account");
        isBusSigned[businessesArray[i]._companyNumber] = true;
    }

  }

  //for the sake of simplicity, we pretend that the contract owner is able to sign as 'the government'
  function govSignature(uint _providedCompanyNumber,string memory _providedBankAccount) public onlyOwner {
    uint businessesLength = businessesArray.length;
    for (uint i = 0; i < businessesLength; i++) {
      require (_providedCompanyNumber == businessesArray[i]._companyNumber && keccak256(abi.encodePacked(_providedBankAccount)) == keccak256(abi.encodePacked(businessesArray[i]._bankAccount)), "Unknown companynumber or bank account");
        isGovSigned[businessesArray[i]._companyNumber] = true;
      }

  }

  function getValidBankAccount(uint _providedCompanyNumber) public view returns(string memory _bankAccount ) {
    uint businessesLength = businessesArray.length;
    
    require(isBankSigned[_providedCompanyNumber] == true && isBusSigned[_providedCompanyNumber] == true && isGovSigned[_providedCompanyNumber] == true, "This company number doesn't have 3 different signatures");
    
    for (uint i = 0; i < businessesLength; i++) {
      if (businessesArray[i]._companyNumber == _providedCompanyNumber) {
        return businessesArray[i]._bankAccount;
      }
       
    }

  }

//closing brace -> end of contract
}
