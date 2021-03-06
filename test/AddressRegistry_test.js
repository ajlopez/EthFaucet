
const AddressRegistry = artifacts.require('./AddressRegistry.sol');

const truffleAssertions = require('truffle-assertions');

contract('AddressRegistry', function (accounts) {
    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

    const alice = accounts[0];
    const bob = accounts[1];
    
    let registry;
    
    beforeEach(async function () {
        registry = await AddressRegistry.new();
    });
    
    it('initial owner', async function () {
        const owner = await registry.owner();
        
        assert.equal(owner, alice);
    });
    
    it('change owner', async function () {
        await registry.setOwner(bob);
        
        const owner = await registry.owner();
        
        assert.equal(owner, bob);
    });
    
    it('only owner can change owner', async function () {
        await truffleAssertions.reverts(registry.setOwner(bob, { from: bob }));
        
        const owner = await registry.owner();
        
        assert.equal(owner, alice);
    });
    
    it('unknown address', async function () {
        const name = await registry.addressToName(bob);
        
        assert.equal(name, '');
    });
    
    it('unknown name', async function () {
        const address = await registry.nameToAddress('foo');
        
        assert.equal(address, ZERO_ADDRESS);
    });
    
    it('register name address', async function () {
        const txresult = await registry.register('bob', bob);
        
        truffleAssertions.eventEmitted(
            txresult, 
            'Register', 
            function (ev) {
                return ev.addr.toLowerCase() == bob.toLowerCase() &&
                    ev.name == 'bob';
            }
        );
        
        const address = await registry.nameToAddress('bob');
        const name = await registry.addressToName(bob);
        
        assert.equal(address, bob);
        assert.equal(name, 'bob');
    });
    
    it('only owner can register name address', async function () {
        await truffleAssertions.reverts(registry.register('bob', bob, { from: bob }));
    });
});

