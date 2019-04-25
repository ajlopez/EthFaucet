
pragma solidity >=0.4.21 <0.6.0;

contract Accounts {
    address[] accounts;    
    mapping (address => bytes) data;
    mapping (address => bool) reserved;
    
    function getNoAccounts() public view returns (uint) {
        return accounts.length;
    }
    
    function registerAccount(address _account, bytes memory _data) public {
        accounts.push(_account);
        data[_account] = _data;
    }
    
    function getAccount() public view returns (address account, bytes memory bdata) {
        uint n = now % accounts.length;

        while (reserved[accounts[n]])
            n = (n + 1) % accounts.length;
            
        return (accounts[n], data[accounts[n]]);
    }
    
    function reserveAccount(address _account) public {
        require(!reserved[_account]);
        reserved[_account] = true;
    }
}

