# Contract security

## SWC-100 (Function Default Visibility)
The contract doesn't have any functions that shouldn't be public [More information](https://cwe.mitre.org/data/definitions/710.html).

## SWC-103 (Floating pragma)
Specific compiler pragma 0.8.9 used in contracts to avoid accidental bug inclusion through outdated compiler versions [More information](https://cwe.mitre.org/data/definitions/664.html).

## Proper Use of require, assert and revert
Appropriate require statements are put at the beginning of the public functions in order to revert in case of invalid calls.

## Use Modifiers Only for Validation 
The modifiers in this contract are only used for validation of input parameters.