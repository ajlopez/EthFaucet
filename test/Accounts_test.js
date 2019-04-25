
const Accounts = artifacts.require('./Accounts.sol');

contract('Accounts', function (accounts) {
    beforeEach(async function () {
        this.accounts = await Accounts.new();
    });
    
    it('no accounts', async function () {
        const naccounts = await this.accounts.getNoAccounts();
        
        assert.equal(naccounts, 0);
    });
    
    it('register account', async function () {
        await this.accounts.registerAccount(accounts[0], "0x01");
        
        const naccounts = await this.accounts.getNoAccounts();
        
        assert.equal(naccounts, 1);
    });

    it('get account', async function () {
        await this.accounts.registerAccount(accounts[0], "0x01");
        
        const accountData = await this.accounts.getAccount();
        
        assert.ok(accountData);
        console.dir(accountData);
        assert.equal(accountData[0], accounts[0]);
        assert.equal(accountData[1], '0x01');
    });
    
    it('register two accounts, reserve one account, get account', async function () {
        await this.accounts.registerAccount(accounts[0], "0x01");
        await this.accounts.registerAccount(accounts[1], "0x02");

        await this.accounts.reserveAccount(accounts[0]);
        
        const accountData = await this.accounts.getAccount();
        
        assert.ok(accountData);
        console.dir(accountData);
        assert.equal(accountData[0], accounts[1]);
        assert.equal(accountData[1], '0x02');
    });
});

