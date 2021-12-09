# Blockchain technology to combat B2B fraud with bank account numbers

This project aims to use blockchain technology to prevent businesses falling victim to attacks such as phishing emails or claiming the bank account of 'a supplier' changed..
It uses the 'everybody lies' principle, where we assume no one can be trusted.

The correct bank account number(s) for a company can be broadcast to the public, by using at least 3 on-chain signatures:
 - The business that holds the bank account
 - The bank
 - The government

Banks, payment providers and other actors in the financial world can do a quick API call to get onchain data. The only thing needed is the company account number (VAT number in Europe for example). One can input the VAT number of their supplier to get a list of verified bank account numbers using afetch command. This provides peace of mind by ensuring payment is going to the correct supplier.

# Current workflow

1. The business gets registered with the government and bank. A bank account number is issued and provided to the government.
2. The 3 important actors all know the real bank account number. They log in to a portal and confirm bank account number 098ZYX belongs to company number 123ABC.
3. When there are 3 different signatures for a given combination, the information is validated on-chain and the correct bank account number for each business can be retreived with a fetch command.
4. Banks can integrate the data in their payment screens. Before the payment is allowed, a check is made with the on-chain data.

#How to use this dapp?

0.  This dapp can only be fully tested when deploying the contract to your localhost, use Ganache GUI or CLI for this.
1. Clone this repo and run `npm install` to install all dependencies.
2.  Install Metamask and log in
3.  Launch a new workspace on Ganache.
4.  Make sure to check if Ganache runs on port 8545. If it runs on another port (7545 for example), modify your `truffle-config.js` like so:
`development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },`
5.  Copy the private key of the first 3 accounts and import these 3 accounts in Metamask ([Click here for instructions](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account)). For ease of use, you should rename the 3 imported accounts like so:
 - a. Owner/government
 - b. HSBC
 - c. ConsenSys

6.  Cd into the `fraudbattle` folder and run `npm start`. 
7.  Go to the new tab that was just opened, and 
6.  Wait for the transaction to complete
4.  You can now query the on-chain records for the company records you submitted. There will be 3 valid signatures for these records, and the dapp will return these valid records.


# Ideas / things to add

 - Multisig wallets
 - Make sure only certain actors can sign in: How will we verify a bank as 'bank actor' in the process, etc.
