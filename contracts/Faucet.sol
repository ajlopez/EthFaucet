// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract Faucet {
    address public owner;
    
    uint public amount;
    
    mapping (address => bool) public funded;
    
    constructor(uint _amount) public payable {
        owner = msg.sender;
        setAmount(_amount);
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        
        _;
    }
    
    receive () external payable {
    }
    
    function setAmount(uint newAmount) public onlyOwner {
        amount = newAmount;
    }
    
    function transfer(address payable receiver) public {
        require(!funded[receiver]);
            
        funded[receiver] = true;
        receiver.transfer(amount);
    }
}

