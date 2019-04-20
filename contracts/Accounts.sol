
pragma solidity ^0.4.24;

contract Accounts {
    address[] accounts;    
    mapping (address => bytes) data;
    
    function getNoAccounts() public view returns (uint) {
        return accounts.length;
    }
    
    function registerAccount(address _account, bytes _data) public {
        accounts.push(_account);
        data[_account] = _data;
    }
    
    function getAccount() public view returns (address account, bytes bdata) {
        uint n = now % accounts.length;
        
        return (accounts[n], data[accounts[n]]);
    }
}

