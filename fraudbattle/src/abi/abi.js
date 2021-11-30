export const fraudBattleAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "bankArray",
    "outputs": [
      {
        "internalType": "address",
        "name": "_addressBank",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "businessesArray",
    "outputs": [
      {
        "internalType": "address",
        "name": "_addressBus",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_bankAccount",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_companyNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_bankName",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBankArray",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "_addressBank",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          }
        ],
        "internalType": "struct fraudBattle.Banks[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getBusinessArray",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "_addressBus",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_bankAccount",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_companyNumber",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_bankName",
            "type": "string"
          }
        ],
        "internalType": "struct fraudBattle.Businesses[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_registeredName",
        "type": "string"
      }
    ],
    "name": "addBankUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_bankAccount",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_companyNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_bankName",
        "type": "string"
      }
    ],
    "name": "addBusiness",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_providedCompanyNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_providedBankAccount",
        "type": "string"
      }
    ],
    "name": "bankSignature",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_providedCompanyNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_providedBankAccount",
        "type": "string"
      }
    ],
    "name": "busSignature",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_providedCompanyNumber",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_providedBankAccount",
        "type": "string"
      }
    ],
    "name": "govSignature",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_providedCompanyNumber",
        "type": "uint256"
      }
    ],
    "name": "getValidBankAccount",
    "outputs": [
      {
        "internalType": "string",
        "name": "_bankAccount",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]