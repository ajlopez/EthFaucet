
const Faucet = artifacts.require('./Faucet.sol');

const expectThrow = require('./utils').expectThrow;

contract('Faucet', function (accounts) {
    beforeEach(async function () {
        this.faucet = await Faucet.new(1000000, { value: 10000000 });
    });
    
    it('initial balance', async function () {
        const initialBalance = await web3.eth.getBalance(this.faucet.address);
        
        assert.equal(initialBalance.toNumber(), 10000000);
    });
    
    it('fund account', async function () {
        const initialBalance = await web3.eth.getBalance(accounts[1]); 
        await this.faucet.transfer(accounts[1]);
        
        const balance = await web3.eth.getBalance(accounts[1]); 
        assert.ok(balance.equals(initialBalance.add(1000000)));
    });
    
    it('fund account twice', async function () {
        const initialBalance = await web3.eth.getBalance(accounts[1]); 
        await this.faucet.transfer(accounts[1]);
        await expectThrow(this.faucet.transfer(accounts[1]));
        
        const balance = await web3.eth.getBalance(accounts[1]); 
        assert.ok(balance.equals(initialBalance.add(1000000)));
    });
});