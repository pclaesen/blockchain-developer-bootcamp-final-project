# Blockchain technology to combat B2B fraud with bank account numbers

This project aims to use blockchain technology to prevent businesses falling victim to attacks such as phishing emails or claiming the bank account of 'a supplier' changed..
It uses the 'everybody lies' principle, where we assume no one can be trusted.

The correct bank account number(s) for a company can be broadcast to the public, by using at least 3 on-chain signatures:
 - The business that holds the bank account
 - The bank
 - The government

Banks, payment providers and other actors in the financial world can do a quick API call to get onchain data. The only thing needed is the company account number (VAT number in Europe for example). One can input the VAT number of their supplier to get a list of verified bank account numbers using afetch command. This provides peace of mind by ensuring payment is going to the correct supplier.

## Current workflow

1. The business gets registered with the government and bank. A bank account number is issued and provided to the government.
2. The 3 important actors all know the real bank account number. They log in to a portal and confirm bank account number 098ZYX belongs to company number 123ABC.
3. When there are 3 different signatures for a given combination, the information is validated on-chain and the correct bank account number for each business can be retreived with a fetch command.
4. Banks can integrate the data in their payment screens. Before the payment is allowed, a check is made with the on-chain data.

## General remarks:
- This dapp can only be fully tested when deploying the contract to your localhost, use Ganache GUI or CLI for this.
- The company number can only exists of numbers (uint).
- All names should be entered in capital letters (see NatSpec information in the .sol file).


## Directory structure:
| Folder   | Description |
| -------- | ----------- |
| Build    | Contains json files for imported contracts and migration files |
| Contracts | Contains migration and fraudBattle main contract |
| Migrations | Javascript files to handle migrations |
| Test | Contains the unit tests |
## Install dependencies:
This dapp uses following dependencies:
- truffle/hdwallet-provider: ^1.7.0
- dotenv: ^10.0.0
- node: ^16.13.0
- ethers.js
- React

## How to use this dapp?

1.  Create a new directory, clone this repo and run `npm install` to install all dependencies.
2.  Install Metamask and log in
3.  Launch a new workspace on Ganache.
4.  Create a new `.env` file in the root folder of the project.
5.  Copy the mnemonic phrase from Ganache and paste it in the `.env` file like so:
`MNEMONIC = "insert mnemonic here, do not delete the "" "`
6.  Make sure to check if Ganache runs on port 8545. If it runs on another port (7545 for example), modify your `truffle-config.js` like so:
```development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
```
7. Go to Metamask and change the network to 'Localhost: 8545' (or your custom port number, see #6).
8. Deploy the contract with ´truffle migrate --network development´.
9. Grab the contract address after the deployment has finished, go the the directory `fraudbattle\src\` and paste it on line 7 of the file `Connected.js`: `const contractAddress = "paste contract address here"`.
10. Copy the private key of the first 3 accounts and import these 3 accounts in Metamask ([Click here for instructions](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account)). For ease of use, you should rename the 3 imported accounts like so:
    -  Owner/government (imported account 1)
    -  HSBC (imported account 2)
    -  CONSENSYS (imported account 3)

11. Copy the wallet address of all 3 accounts to a text editor.
12. Cd into the `fraudbattle` folder and install the necessary dependencies (like React) with `npm install`. 
13. Start the dapp with `npm start`.
14. Go to the new tab that was just opened.
15. In your Metamask wallet, connect to the `localhost` network, make sure to select the 'Owner/government' account and connect the account to the dapp.
16. Add a new bank called `HSBC` with the appropriate wallet address (account 2), click the `Confirm` button and after that the grey `Add bank on-chain` button. Wait for the transaction to complete.
17. Add a new business called `CONSENSYS` with the appropriate wallet address (account 3) and other details (only numbers for the company number!) and wait for the transaction to complete. Make sure to use `HSBC` as bank.
18. Go to section B.
19. While still using the owner/government account (account 1), click the greyconfirm the combination of company number and bank account number of the business you just added.
20. Switch to the account `HSBC` (account 2), connect to the dapp again, click the grey 'Bank' button and confirm the combination of company number and bank account number.
21. Switch to the account `CONSENSYS` (account 3), connect to dapp site again,  click the grey 'Business' button and confirm the combination of company number and bank account number.
22. You can now query the on-chain records and retreive the confirmed bank account number for the business you added.


## Ideas / things to add

 - Multisig wallets
 - Ability for end-users/contracts to verify the official wallet address of a business.

## Public Ethereum Account
0xd97fA6CCc45D404fD369D3aDfD440F5e8Ff85477
