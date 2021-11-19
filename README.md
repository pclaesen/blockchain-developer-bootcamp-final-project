# Blockchain technology to combat B2B fraud with bank account numbers

This project aims to use blockchain technology to prevent businesses falling victim to attacks such as phishing emails or claiming the bank account of 'a supplier' changed..
It uses the 'everybody lies' principle, where we assume no one can be trusted.

The correct bank account number(s) for a company can be broadcast to the public, by using at least 3 on-chain signatures:
 - The business that holds the bank account
 - The bank
 - The government

Banks, payment providers and other actors in the financial world can do a quick API call to get onchain data. The only thing needed is the company account number (VAT number in Europe for example). Input the VAT number of your supplier, get a list of the correct (verified) bank account numbers with an API call and the payer is absolutely sure he's paying his supplier.

# Current workflow

1. The business gets registered with the government and bank. A bank account number is issued and provided to the government.
2. The 3 important actors all know the real bank account number. They log in to a portal and confirm bank account number 098ZYX belongs to company number 123ABC.
3. When there are 3 different signatures for a given combination, the information is submitted on-chain.
4. Banks can integrate the data in their payment screens. Before the payment is allowed, a check is made with the on-chain data.

# Ideas / things to add

 - Multisig wallets
 - Make sure only certain actors can sign in: How will we verify a bank as 'bank actor' in the process, etc.
