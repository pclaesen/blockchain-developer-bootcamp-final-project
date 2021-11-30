import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ReactDOM from "react-dom";
import { fraudBattleAbi } from "./abi/abi";


const contractAddress = "0x1395F866d6cf4AD9b767b6b1A0374D036d0513D2";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const myContract = new ethers.Contract(contractAddress, fraudBattleAbi, signer);


// function getAccount() {
//     const accountResponse = window.ethereum.request({ method: 'eth_requestAccounts' });
    
//     return accountResponse
//       .then(accounts => accounts[0]);
      
      
    
// }












const Connected = () => {

    // useEffect(() => {
    //     getAccounts();
    // })

    //Reload screen on account or network change
    window.ethereum.on('accountsChanged', (accounts) => {
        window.location.reload();
        console.log("Reloaded account changed");
        handleChangeConnection();
        
      });

    window.ethereum.on('chainChanged', (accounts) => {
      window.location.reload();
      console.log("Reloaded chain changed");
      handleChangeConnection();
    });

    const[account, setAccount] = useState('');
    const[userBusiness, setUserBusiness] = useState(0);
    const[userBank, setUserBank] = useState(0);
    const[userGov, setUserGov] = useState(0);
    const[companyNumberTemp, setCompanyNumberTemp] = useState('');
    const[bankAccountTemp, setBankAccountTemp] = useState('');
    const[companyNumber, setCompanyNumber] = useState('');
    const[bankAccount, setBankAccount] = useState('');
    const[bankNameAddedByOwnerTemp, setBankNameAddedByOwnerTemp] = useState('');
    const[bankNameAddedByOwner, setBankNameAddedByOwner] = useState('');
    const[addressBankAddedByOwnerTemp, setAddressBankAddedByOwnerTemp] = useState('');
    const[addressBankAddedByOwner, setAddressBankAddedByOwner] = useState('');
    const[userTypeToSign, setUserTypeToSign] = useState('');

    async function getAccounts() {
        const accounts = await provider.listAccounts();
        let accountTemp = accounts[0];
        // console.log(accountTemp);
        setAccount(accountTemp);
                        
    }
    
    const handleChangeConnection = () => {
        getAccounts();
        
      };



    function isUserBank() {
        setUserBank(true);
        setUserBusiness(false);
        setUserGov(false);
    }

    function isUserBusiness() {
        setUserBank(false);
        setUserBusiness(true);
        setUserGov(false);
    }

    function isUserGovernment() {
        setUserBank(false);
        setUserBusiness(false);
        setUserGov(true);
    }

    const handleChangeCompanyNumber = event => {
        setCompanyNumberTemp(event.target.value);
    }

    const handleChangeBankAccount = event => {
        setBankAccountTemp(event.target.value);
    }

    const handleChangeBankNameAddedbyOwner = event => {
        setBankNameAddedByOwnerTemp(event.target.value);
    }

    const handleChangeAddressBankAddedByOwner = event => {
        setAddressBankAddedByOwnerTemp(event.target.value);
    }

    function showUserType() {
        if (userBusiness === true) {
            console.log("You are a business");
        }
        else if (userBank === true) {
            console.log("You are a bank");
        }
        else if (userGov === true) {
            console.log("You work for the government");
        }
        else {
            console.log("Please select a usertype");
        }
    }

    
    const handleSubmit = event => {

        if (companyNumberTemp && bankAccountTemp && (userBusiness || userBank || userGov)) {
    
          setCompanyNumber(companyNumberTemp);
          setBankAccount(bankAccountTemp);
          if (userBusiness === true) {
            setUserTypeToSign("Business");
          }
          else if (userBank === true) {
            setUserTypeToSign("Bank");            
            }
          else {
              setUserTypeToSign("Government");
          }
    
        }
        
    
        else {
    
            alert("No values submitted and/or no user type selected");
    
        };
        
        event.preventDefault();
    
      };

      const handleSubmitBankOwner = event => {
        if(bankNameAddedByOwnerTemp && addressBankAddedByOwnerTemp ) {
            setBankNameAddedByOwner(bankNameAddedByOwnerTemp);
            setAddressBankAddedByOwner(addressBankAddedByOwnerTemp);

        }
        console.log(bankNameAddedByOwner + " " + addressBankAddedByOwner);
        
        
        event.preventDefault();
    
      };

      

      async function addBank() { //a bank can only be added by the owner of the contract
        let contractWithSigner = myContract.connect(signer);
        let addBankResult = await contractWithSigner.addBankUser(addressBankAddedByOwner, bankNameAddedByOwner);
        await provider.waitForTransaction(addBankResult.hash);
        const receipt = await provider.getTransactionReceipt(addBankResult.hash);
        console.log(receipt);

      }

      async function returnBankArray() {
        let contractWithSigner = myContract.connect(signer);
        let showBankArray = await contractWithSigner.getBankArray();
        console.log(showBankArray);
      }

      async function returnBusinessArray() {
        let contractWithSigner = myContract.connect(signer);
        let showBankArray = await contractWithSigner.getBusinessArray();
        console.log(showBankArray);
      }

    async function signTxBank() { //confirm the business details as a bank
        let contractWithSigner = myContract.connect(signer);
        let bankArrayTemp =await contractWithSigner.getBankArray();

        // await getAccount();
        
        //get the bank address from the array:
        let bankAddressArray = [];
        for (var i = 0; i < bankArrayTemp.length; i++) {
            console.log("Bank index " + [i] + " " + bankArrayTemp[i]._addressBank);
            bankAddressArray.push((bankArrayTemp[i]._addressBank).toLowerCase());
        }
        
        console.log(bankAddressArray);
        var accountLowerCase = account.toLowerCase();
        console.log(accountLowerCase);  
        
        if (bankAddressArray.includes(accountLowerCase)) {
            if(companyNumber && bankAccount) {
                let contractWithSigner = myContract.connect(signer);
                let signTxBankResult = await contractWithSigner.bankSignature(companyNumber, bankAccount);
                console.log(signTxBankResult);
            } else {
                alert("Please insert a company number and/or a bank account");
            }
            
        } else {
            alert("You are not a bank");

        }
        
    }

    async function signTxBusiness() {
        let contractWithSigner = myContract.connect(signer);
        
        let businessArrayTemp = await contractWithSigner.getBusinessArray();
        //check if business already exists in array:
        if (businessArrayTemp.includes(companyNumber && bankAccount)) {
            alert("This data combination has already been added");
        } else {
            //sign the transaction and add the data on-chain:
            let signTxBusinessResult = await contractWithSigner.busSignature(companyNumber, bankAccount);
                console.log(signTxBusinessResult);
        }

    }

    function addRecords() {
        if (userBank === true) {
            signTxBank();
        } else if (userBusiness === true) {
            signTxBusiness();
        } else if (userGov === true) {
            console.log("You will sign as a government");
        } else {
            console.log("error addRecords()")
        }
    }


      

  
      
      
    
      

    if (account.length < 1) {
  
        return(
            <div>
                Please connect your wallet to start using the app<br/>
                <button className="connectButton" onClick={handleChangeConnection()}>Connect wallet</button>
            </div>
        )
    } 
    else {
        return(
        
            <div className='bodyDiv'>
                Wallet connected, thank you.<br />
                Only the government can add a business with the appropriate records on-chain. To do that, use the form below.<br />
                If you want to confirm existing records as a bank or business, go to section B.<br />
                <form onSubmit={handleSubmitAddBusiness}>
                
                    <input type="text" className="companyAddress" value={companyNumberTemp} placeholder="Insert company number" onChange={handleChangeCompanyNumber} />
                    <input type="text" className="bankAccount" value={bankAccountTemp} placeholder="Bank account number" onChange={handleChangeBankAccount} />               

                    <button type="submit">Confirm</button>

                </form>

            
                <strong>Section B</strong><br />
                Please identify yourself by selecting one of the 3 options below: <br />
                
                    
                    <button className='businessButton' onClick={() => isUserBusiness(true)}>Business</button><br />
                    <button className='bankButton' onClick={isUserBank}>Bank</button><br />
                    <button className='governmentButton' onClick={isUserGovernment}>Government</button><br />                                 
                    <button className='triggerFunctionBasedOnUserBusiness' onClick={showUserType}>Console log usertype</button>
                
                


            
                <form onSubmit={handleSubmit}>
                
                    <input type="text" className="companyNumber" value={companyNumberTemp} placeholder="Insert company number" onChange={handleChangeCompanyNumber} />
                    <input type="text" className="bankAccount" value={bankAccountTemp} placeholder="Bank account number" onChange={handleChangeBankAccount} />               

                    <button type="submit">Confirm</button>

                </form>
            
            <br />
            These values will be submitted on-chain:<br />
            You will sign as a {userTypeToSign}, you will confirm the company with ID {companyNumber} is the owner of bank account number {bankAccount}.<br />
            <br />
            <br />
            <button className='confirmBusinessRecords' onClick={addRecords}>Add records</button>
            <br />
            Owner only:<br />
            Add bank:<br />
            <form onSubmit={handleSubmitBankOwner}>
                
                    <input type="text" className="bankName" value={bankNameAddedByOwnerTemp} placeholder="Insert bank name" onChange={handleChangeBankNameAddedbyOwner} />
                    <input type="text" className="addressBankAddedByOwner" value={addressBankAddedByOwnerTemp} placeholder="Bank wallet address" onChange={handleChangeAddressBankAddedByOwner} />               

                    <button type="submit">Confirm</button>

                </form>
            As owner, you will add bank {bankNameAddedByOwner} with address {addressBankAddedByOwner}.<br />
            Are you sure you want to add this bank?<br />0xd3A0546C4bFaeE184343AAB2b63C2aadE6B9476E<br />
            <button className='addBankButton' onClick={addBank}>Add bank and sign transaction</button><br />
            <button className='showBankArray' onClick={returnBankArray}>Console log bank array</button><br />
            <button className='showBankArray' onClick={returnBusinessArray}>Console log business array</button><br />
            <br />
            <br /><button className='showBankArray' onClick={signTxBank}>Button to add business as bank</button><br />




            




            </div>
             
        
        )





    }
 

}
export default Connected;