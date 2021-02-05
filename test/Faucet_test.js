
const Faucet = artifacts.require('./Faucet.sol');

const truffleAssertions = require('truffle-assertions');

contract('Faucet', function (accounts) {
    const amount = 1000000;
    
    beforeEach(async function () {
        this.faucet = await Faucet.new(amount, { value: 10000000 });
    });
    
    it('initial owner', async function () {
        const initialOwner = await this.faucet.owner();
        
        assert.equal(initialOwner, accounts[0]);
    });
    
    it('initial balance', async function () {
        const initialBalance = await web3.eth.getBalance(this.faucet.address);
        
        assert.equal(initialBalance, 10000000);
    });
    
    it('initial amount', async function () {
        const initialAmount = Number(await this.faucet.amount());
        
        assert.equal(initialAmount, amount);
    });
    
    it('set amount', async function () {
        await this.faucet.setAmount(amount * 2);
        
        const initialAmount = Number(await this.faucet.amount());
        
        assert.equal(initialAmount, amount * 2);
    });
    
    it('only owner can set amount', async function () {
        await truffleAssertions.reverts(this.faucet.setAmount(amount * 2, { from: accounts[1] }));
    });
    
    it('fund account', async function () {
        const initialBalance = await web3.eth.getBalance(accounts[1]); 
        await this.faucet.transfer(accounts[1]);
        
        const balance = await web3.eth.getBalance(accounts[1]); 
        assert.equal(balance, new web3.utils.BN(initialBalance).addn(1000000));
    });
    
    it('fund account twice', async function () {
        const initialBalance = await web3.eth.getBalance(accounts[1]); 
        await this.faucet.transfer(accounts[1]);
        await truffleAssertions.reverts(this.faucet.transfer(accounts[1]));
        
        const balance = await web3.eth.getBalance(accounts[1]); 
        assert.equal(balance, new web3.utils.BN(initialBalance).addn(1000000));
    });
});

