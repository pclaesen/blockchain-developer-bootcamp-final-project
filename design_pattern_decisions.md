# Design patterns used in this contract

## Access Control Design Patterns
The `Ownable` design pattern (imported from OpenZeppelin - thanks guys!) is used in 2 functions: `addBankUser` and `addBusiness`.
As mentioned in the README.md, the contract owner also has the role of government for ease of use in this final project.
Should this contract go live, the modifier `ownerOnly` would only be used in function `addBankUser`.

The other design patter in use is `AccessControl`. The access control allows for the creation of different roles in the contract.
For this project, we need at least one addition role, namely banks. This design patter in used in the `constructor`, to setup the contract owner
as `DEFAULT_ADMIN_ROLE` and to make sure the modifier `bankOnly` can only be used when the given address was assigned the bank role, and in the function
`addBankUser`, where an address is assigned the new, custom role.