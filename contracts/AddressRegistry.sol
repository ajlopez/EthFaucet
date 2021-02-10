// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract AddressRegistry {
    address public owner;
    
    mapping(address => string) public addressToName;
    mapping(string => address) public nameToAddress;
    
    constructor() public {
        owner = msg.sender;
    }
}
