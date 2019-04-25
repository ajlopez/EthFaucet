
pragma solidity >=0.4.21 <0.6.0;

contract Faucet {
    uint public amount;
    mapping (address => bool) public funded;
    
    constructor(uint _amount) public payable {
        amount = _amount;
    }
    
    function () external payable {
    }
    
    function transfer(address payable receiver) public {
        require(!funded[receiver]);
            
        funded[receiver] = true;
        receiver.transfer(amount);
    }
}

