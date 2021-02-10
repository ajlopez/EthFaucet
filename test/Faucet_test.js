
const Faucet = artifacts.require('./Faucet.sol');

const truffleAssertions = require('truffle-assertions');

function generateRandomHexaByte() {
    let n = Math.floor(Math.random() * 255).toString(16);
    
    while (n.length < 2)
        n = '0' + n;
    
    return n;
}

function generateRandomAddress() {
    let txt = '';
    
    for (let k = 0; k < 20; k++)
        txt += generateRandomHexaByte();
    
    return '0x' + txt;
}

contract('Faucet', function (accounts) {
    const alice = accounts[0];
    const bob = accounts[1];
    
    const amount = 1000000;
    const nblocks = 10;
    
    beforeEach(async function () {
        this.faucet = await Faucet.new(amount, nblocks, { value: 10000000 });
    });
    
    it('initial owner', async function () {
        const initialOwner = await this.faucet.owner();
        
        assert.equal(initialOwner, alice);
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
        await truffleAssertions.reverts(this.faucet.setAmount(amount * 2, { from: bob }));
    });
    
    it('initial nblocks', async function () {
        const initialNBlocks = Number(await this.faucet.nblocks());
        
        assert.equal(initialNBlocks, nblocks);
    });
    
    it('set nblocks', async function () {
        await this.faucet.setNBlocks(nblocks * 2);
        
        const initialNBlocks = Number(await this.faucet.nblocks());
        
        assert.equal(initialNBlocks, nblocks * 2);
    });
    
    it('only owner can set nblocks', async function () {
        await truffleAssertions.reverts(this.faucet.setNBlocks(nblocks * 2, { from: accounts[1] }));
    });
    
    it('transfer to address', async function () {
        const charlie = generateRandomAddress();
        
        const initialBalance = await web3.eth.getBalance(charlie); 
        await this.faucet.transferToAddress(charlie);
        
        const balance = await web3.eth.getBalance(charlie); 
        assert.equal(balance, new web3.utils.BN(initialBalance).addn(1000000));
    });
    
    it('only owner can transfer to address', async function () {
        const charlie = generateRandomAddress();
        
        await truffleAssertions.reverts(this.faucet.transferToAddress(charlie, { from: bob }));
    });
    
    it('cannot transfer to address twice because high balance', async function () {
        const dan = generateRandomAddress();
        
        const initialBalance = await web3.eth.getBalance(dan); 
        await this.faucet.transferToAddress(dan);
        await truffleAssertions.reverts(this.faucet.transferToAddress(dan));
        
        const balance = await web3.eth.getBalance(dan); 
        assert.equal(balance, new web3.utils.BN(initialBalance).addn(1000000));
    });
    
    it('cannot transfer to address twice because few blocks elapsed', async function () {
        const charlie = generateRandomAddress();
        
        const initialBalance = await web3.eth.getBalance(bob); 

        await web3.eth.sendTransaction({
            from: bob,
            to: charlie,
            value: initialBalance,
            gas: 21000,
            gasPrice: 0
        });

        await this.faucet.transferToAddress(bob);

        await web3.eth.sendTransaction({
            from: bob,
            to: charlie,
            value: amount / 2,
            gas: 21000,
            gasPrice: 0
        });
        
        await truffleAssertions.reverts(this.faucet.transferToAddress(bob));
        
        const balance = Number(await web3.eth.getBalance(bob)); 
        assert.equal(balance, amount / 2);
    });
    
    it('cannot transfer to address twice because few blocks elapsed', async function () {
        const charlie = generateRandomAddress();
        
        const initialBalance = await web3.eth.getBalance(bob); 

        await web3.eth.sendTransaction({
            from: bob,
            to: charlie,
            value: initialBalance,
            gas: 21000,
            gasPrice: 0
        });

        await this.faucet.transferToAddress(bob);

        await web3.eth.sendTransaction({
            from: bob,
            to: charlie,
            value: amount / 2,
            gas: 21000,
            gasPrice: 0
        });
        
        await this.faucet.setNBlocks(2);
        await this.faucet.transferToAddress(bob);
        
        const balance = Number(await web3.eth.getBalance(bob)); 
        assert.equal(balance, amount / 2 + amount);
    });
});

