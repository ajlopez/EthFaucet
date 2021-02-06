// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract Faucet {
    address public owner;
    
    uint public amount;
    uint public nblocks;
    
    mapping (address => bool) public funded;
    
    constructor(uint _amount, uint _nblocks) public payable {
        owner = msg.sender;
        setAmount(_amount);
        setNBlocks(_nblocks);
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
    
    function setNBlocks(uint newNBlocks) public onlyOwner {
        nblocks = newNBlocks;
    }
    
    function transfer(address payable receiver) public {
        require(!funded[receiver]);
            
        funded[receiver] = true;
        receiver.transfer(amount);
    }
}

