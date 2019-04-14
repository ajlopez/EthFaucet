
pragma solidity ^0.4.24;

contract Faucet {
    uint public amount;
    mapping (address => bool) public funded;
    
    constructor(uint _amount) public payable {
        amount = _amount;
    }
    
    function () public payable {
    }
    
    function transfer(address receiver) public {
        require(!funded[receiver]);
            
        funded[receiver] = true;
        receiver.transfer(amount);
    }
}

