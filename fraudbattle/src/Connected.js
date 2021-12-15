import React, { useState, useEffect } from 'react';
import { ethers, BigNumber } from 'ethers';
import ReactDOM from "react-dom";
import { fraudBattleAbi } from "./abi/abi";


const contractAddress = "0x3bc2a3d03520056aadaAbF23A71183037DE0def1";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const myContract = new ethers.Contract(contractAddress, fraudBattleAbi, signer);

const ShowBankAccount = ({ returnedBankAccount }) => {
    useEffect(() => {
               
                   
    },[returnedBankAccount]);
    
    return <div>It is safe to use bank account {returnedBankAccount}</div>;
};

const ShowAddedBusiness = ({addressBusinessAddedByBGovFinal, businessNameFinal, bankAccountAddedByGovFinal, businessNumberAddedByGovFinal, bankNameAddedByGovFinal}) => {
    useEffect(() => {
               
                   
    },[addressBusinessAddedByBGovFinal, businessNameFinal, bankAccountAddedByGovFinal, businessNumberAddedByGovFinal, bankNameAddedByGovFinal]);
    if (addressBusinessAddedByBGovFinal) {
        return <div>Successfully added a business with these records:<br />
            - {addressBusinessAddedByBGovFinal}<br />
            - {businessNameFinal}<br />
            - {bankAccountAddedByGovFinal}<br />
            - {businessNumberAddedByGovFinal}<br />
            - {bankNameAddedByGovFinal}<br />
                    
            </div>;
    } else {
        return<div></div>
    }
};

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

    //add business consts:
    const[businessNumberTempAddedByGov, setBusinessNumberTempAddedByGov] = useState('');
    const[bankAccountTempAddedByGov, setBankAccountTempAddedByGov] = useState('');
    const[businessNumberAddedByGov, setBusinessNumberAddedByGov] = useState('');
    const[bankAccountAddedByGov, setBankAccountAddedByGov] = useState('');
    const[bankNameTempAddedByGov, setBankNameTempAddedByBank] = useState('');
    const[bankNameAddedByGov, setBankNameAddedByGov] = useState('');
    const[addressBusinessTempAddedByGov, setAddressBusinessTempAddedByGov] = useState('');
    const[addressBusinessAddedByBGov, setAddressBusinessAddedByBGov] = useState('');
    const[businessNameTemp, setBusinessNameTemp] = useState('');
    const[businessName, setBusinessName] = useState('');
    

    //add company number to check verified bank account by all parties
    const[verifiedCompanyNumberTemp, setVerifiedCompanyNumberTemp] = useState('');
    const[verifiedCompanyNumber, setVerifiedCompanyNumber] = useState('');
    const[returnedBankAccount, setReturnedBankAccount] = useState('');

    //final business details when the transaction has been signed
    const[addressBusinessAddedByBGovFinal, setAddressBusinessAddedByBGovFinal] = useState('');
    const[businessNameFinal, setBusinessNameFinal] = useState('');
    const[bankAccountAddedByGovFinal, setBankAccountAddedByGovFinal] = useState('');
    const[businessNumberAddedByGovFinal, setBusinessNumberAddedByGovFinal] = useState('');
    const[bankNameAddedByGovFinal, setBankNameAddedByGovFinal] = useState('');


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

    const handleChangeBusinessAddress = event => {
        setAddressBusinessTempAddedByGov(event.target.value);
    }

    const handleChangeBusinessNameAddedGov = event => {
        setBusinessNameTemp(event.target.value);
    }

    const handleChangeBankAccountAddedGov = event => {
        setBankAccountTempAddedByGov(event.target.value);
    }

    const handleChangeBusinessNumberAddedGov = event => {
        setBusinessNumberTempAddedByGov(event.target.value);
    }

    const handleChangeBankNameAddedGov = event => {
        setBankNameTempAddedByBank(event.target.value);
    }

    const handleChangeCompanyNumberVerifiedBankAccount = event => {
        setVerifiedCompanyNumberTemp(event.target.value);
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
        
        event.preventDefault();
    
      };

      const handleSubmitAddBusiness = event => {
        if (addressBusinessTempAddedByGov && 
            businessNameTemp && 
            bankAccountTempAddedByGov && 
            businessNumberTempAddedByGov &&
            bankNameTempAddedByGov ) {
                setAddressBusinessAddedByBGov(addressBusinessTempAddedByGov);
                setBusinessName(businessNameTemp);
                setBankAccountAddedByGov(bankAccountTempAddedByGov);
                setBusinessNumberAddedByGov(businessNumberTempAddedByGov);
                setBankNameAddedByGov(bankNameTempAddedByGov);
                
                
            }
            
            else {
                alert("Not all fields have been filled");
            }
        
        
        
        event.preventDefault();
    
      };

      const handleSubmitVerifiedBankAccount = event => {
        if (verifiedCompanyNumberTemp) {
            setVerifiedCompanyNumber(verifiedCompanyNumberTemp);
                
            }
            else {
                console.log("Company number not submitted");
                alert("Please insert and confirm the company number")
            }
        
        
        
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

    async function addBusinessAsGovernment() {
        let contractWithSigner = myContract.connect(signer);

        let businessArrayTemp =await contractWithSigner.getBusinessArray();
        let bankArrayTemp =await contractWithSigner.getBankArray();
      
        //get the business address from the array:
        let businessValidationArray = [];
        let bankNameValidationArray = [];
        let addressBusinessLowerCase = JSON.stringify(addressBusinessAddedByBGov.toLowerCase());
        // let companyNumberString = businessNumberAddedByGov.toString();
        for (var i = 0; i < businessArrayTemp.length; i++) {
            let addressBusValidation = JSON.stringify((businessArrayTemp[i]._addressBus).toLowerCase());
            let companyNumberValidation = (((businessArrayTemp[i]._companyNumber).toString())).toLowerCase();
            businessValidationArray.push({addressBusValidation, companyNumberValidation});
            
        }     
        
        let bankNameUpperCase = JSON.stringify(bankNameAddedByGov.toUpperCase()); //bank name added front-end
        for (var i = 0; i < bankArrayTemp.length; i++) {
            let bankNameValidation = JSON.stringify((bankArrayTemp[i]._name).toUpperCase());
            // let companyNumberValidation = (((businessArrayTemp[i]._companyNumber).toString())).toLowerCase();
            // console.log(addressBusValidation + " " + companyNumberValidation);
            bankNameValidationArray.push(bankNameValidation);
            
        }     

        for (var i = 0; i < bankNameValidationArray.length; i++) {
            if (!bankNameValidationArray.includes(bankNameUpperCase)) {
                alert("Invalid bank name, or bank hasn't been added yet")
                return;
            }
        }

        for (var i = 0; i < businessValidationArray.length; i++) {
            if (businessValidationArray[i].addressBusValidation === addressBusinessLowerCase) {
                alert("This business has already been added")
                return;
            }
        }
            
        let addBusinessResult = await contractWithSigner.addBusiness(addressBusinessAddedByBGov, businessName, bankAccountAddedByGov, businessNumberAddedByGov, bankNameAddedByGov);
        await addBusinessResult.wait();
        await provider.waitForTransaction(addBusinessResult.hash);
        const receipt = await provider.getTransactionReceipt(addBusinessResult.hash);
        console.log(receipt);
        alert("Business added, thank you");
        if (receipt) {
            setAddressBusinessAddedByBGovFinal(addressBusinessAddedByBGov);
            setBusinessNameFinal(businessName);
            setBankAccountAddedByGovFinal(bankAccountAddedByGov);
            setBusinessNumberAddedByGovFinal(businessNumberAddedByGov);
            setBankNameAddedByGovFinal(bankNameAddedByGov);

        }
            
        

        
        
        


        
    }

    async function signTxBank() { //confirm the business details as a bank
        let contractWithSigner = myContract.connect(signer);
        let bankArrayTemp =await contractWithSigner.getBankArray();
      
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

    async function signTxBusiness() { //confirm the business details as a business
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

    async function signTxGovernment() { //confirm the business details as the government
        let contractWithSigner = myContract.connect(signer);        
        let businessArrayTemp = await contractWithSigner.getBusinessArray();
        //check if business already exists in array:
        if (businessArrayTemp.includes(companyNumber && bankAccount)) {
            alert("This data combination has already been added");
        } else {
            //sign the transaction and add the data on-chain:
            let signTxBusinessResult = await contractWithSigner.govSignature(companyNumber, bankAccount);
                console.log(signTxBusinessResult);
        }



    }

    function addRecords() {
        if (userBank === true) {
            signTxBank();
        } else if (userBusiness === true) {
            signTxBusiness();
        } else if (userGov === true) {
            signTxGovernment();
        } else {
            console.log("error addRecords()")
        }
    }

    async function getVerifiedBankAccount() {
        let contractWithSigner = myContract.connect(signer);
        let verifiedBankAccount = await contractWithSigner.getValidBankAccount(verifiedCompanyNumber);

        // console.log(verifiedBankAccount); 
        setReturnedBankAccount(verifiedBankAccount);
        
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
        <>
            <div className='top'>
                Wallet connected, thank you.<br />
                <strong>Section A: Owner/government only</strong><br />
                <br />
                Only the government/owner can add a business and a bank with the appropriate records on-chain. To do that, use the forms below.<br />
                If you want to confirm existing records as the government, a bank or business, go to section B.<br />
                <br />
                Add bank:<br />
                <form onSubmit={handleSubmitBankOwner}>
                
                    <input type="text" className="bankName" value={bankNameAddedByOwnerTemp} placeholder="Insert bank name" onChange={handleChangeBankNameAddedbyOwner} />
                    <input type="text" className="addressBankAddedByOwner" value={addressBankAddedByOwnerTemp} placeholder="Bank wallet address" onChange={handleChangeAddressBankAddedByOwner} />               

                    <button type="submit">Confirm</button>
                    

                </form>
                <br />
                As owner, you will add bank {bankNameAddedByOwner} with address {addressBankAddedByOwner}.<br />
                Are you sure you want to add this bank?<br />
                <button className='addBankButton' onClick={addBank}>Add bank on-chain</button><br />
                <br />
                <br />
                <form onSubmit={handleSubmitAddBusiness}>
                
                    <input type="text" className="businessAddress" value={addressBusinessTempAddedByGov} placeholder="Business wallet address" onChange={handleChangeBusinessAddress} />
                    <input type="text" className="bankAccount" value={businessNameTemp} placeholder="Business name" onChange={handleChangeBusinessNameAddedGov} />
                    <input type="text" className="bankAccount" value={bankAccountTempAddedByGov} placeholder="Bank account number" onChange={handleChangeBankAccountAddedGov} />               
                    <input type="text" className="bankAccount" value={businessNumberTempAddedByGov} placeholder="Company number" onChange={handleChangeBusinessNumberAddedGov} />
                    <input type="text" className="bankAccount" value={bankNameTempAddedByGov} placeholder="Bank name" onChange={handleChangeBankNameAddedGov} />                  
                    
                    <button type="submit">Confirm</button>
                    

                </form>
                <br />
                 You will add this business: {addressBusinessAddedByBGov}, {businessName}, {bankAccountAddedByGov}, {businessNumberAddedByGov} and {bankNameAddedByGov}.<br />
                <br />
                <button className='businessButtonAdd' onClick={addBusinessAsGovernment}>Add business on-chain</button><br />
                <ShowAddedBusiness addressBusinessAddedByBGovFinal={addressBusinessAddedByBGovFinal} businessNameFinal={businessNameFinal} bankAccountAddedByGovFinal={bankAccountAddedByGovFinal} businessNumberAddedByGovFinal={businessNumberAddedByGovFinal} bankNameAddedByGovFinal={bankNameAddedByGovFinal}/>
                {/* addressBusinessAddedByBGov, businessName, bankAccountAddedByGov, businessNumberAddedByGov, bankNameAddedByGov */}
                <br />
                <br />
                
            </div>
            <div>                

            
                <strong>Section B</strong><br />
                Please identify yourself by selecting one of the 3 options below: <br />
                
                    
                    <button className='businessButton' onClick={() => isUserBusiness(true)}>Business</button>
                    <button className='bankButton' onClick={isUserBank}>Bank</button>
                    <button className='governmentButton' onClick={isUserGovernment}>Government</button><br />
                       
 
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
            
            <button className='showBankArray' onClick={returnBankArray}>Console log bank array</button><br />
            <button className='showBankArray' onClick={returnBusinessArray}>Console log business array</button><br />
            <br />
            <br />
            <br />
            <br />
            Check the verified bank account of any business here:<br />
            <form onSubmit={handleSubmitVerifiedBankAccount}>
                
                    <input type="text" className="companyNumber" value={verifiedCompanyNumberTemp} placeholder="Insert company number" onChange={handleChangeCompanyNumberVerifiedBankAccount} />

                    <button type="submit">Confirm the company number</button><br />
                    <br />
                    <button className='verifyBankButton' onClick={getVerifiedBankAccount}>Show verified bank account</button><br />
                    
            </form>
            
            {returnedBankAccount.length > 1 && <ShowBankAccount returnedBankAccount={returnedBankAccount} />}
            
             
             
         </div>
         </>
        )



        

    }
 

}


export default Connected;