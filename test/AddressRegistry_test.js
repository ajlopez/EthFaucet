
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
    
    it('unknown address', async function () {
        const name = await registry.addressToName(bob);
        
        assert.equal(name, '');
    });
    
    it('unknown name', async function () {
        const address = await registry.nameToAddress('foo');
        
        assert.equal(address, ZERO_ADDRESS);
    });
});