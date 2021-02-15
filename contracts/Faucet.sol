// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract Faucet {
    address public owner;
    
    uint public amount;
    uint public nblocks;
    
    mapping (address => uint) public lastBlock;
    
    event TransferTo(address indexed receiver, uint amount);
    
    constructor(uint _amount, uint _nblocks) public payable {
        owner = msg.sender;
        setAmount(_amount);
        setNBlocks(_nblocks);
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        
        _;
    }
    
    function setOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }
    
    receive () external payable {
    }
    
    function setAmount(uint newAmount) public onlyOwner {
        amount = newAmount;
    }
    
    function setNBlocks(uint newNBlocks) public onlyOwner {
        nblocks = newNBlocks;
    }
    
    function transferToAddress(address payable receiver) public onlyOwner {
        require(receiver.balance < amount);
        require(lastBlock[receiver] == 0 || block.number - lastBlock[receiver] >= nblocks);
            
        lastBlock[receiver] = block.number;
        receiver.transfer(amount);
        
        emit TransferTo(receiver, amount);
    }
    
    function kill() public {
        selfdestruct(payable(owner));
    }
}

