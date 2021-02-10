// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract AddressRegistry {
    address public owner;
    
    mapping(address => string) public addressToName;
    mapping(string => address) public nameToAddress;
    
    constructor() public {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }
    
    function register(string memory name, address addr) public onlyOwner {
        addressToName[addr] = name;
        nameToAddress[name] = addr;
    }
}
