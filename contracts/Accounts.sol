
pragma solidity ^0.4.24;

contract Accounts {
    address[] accounts;
    
    struct AccountData {
        bytes publicKey;
        bytes privateKey;
    }
    
    mapping (address => AccountData) accountsData;
    
    function getNoAccounts() public view returns (uint) {
        return accounts.length;
    }
    
    function registerAccount(address _account, bytes _publicKey, bytes _privateKey) public {
        accounts.push(_account);
        accountsData[_account] = AccountData(_publicKey, _privateKey);
    }
    
    function getAccount() public view returns (address account, bytes publicKey, bytes privateKey) {
        uint n = now % accounts.length;
        
        return (accounts[n], accountsData[accounts[n]].publicKey, accountsData[accounts[n]].privateKey);
    }
}
