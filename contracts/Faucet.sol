// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract Faucet {
    address public owner;
    
    uint public amount;
    
    mapping (address => bool) public funded;
    
    constructor(uint _amount) public payable {
        owner = msg.sender;
        amount = _amount;
    }
    
    receive () external payable {
    }
    
    function transfer(address payable receiver) public {
        require(!funded[receiver]);
            
        funded[receiver] = true;
        receiver.transfer(amount);
    }
}

