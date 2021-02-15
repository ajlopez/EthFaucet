
const utils = require('./lib/utils');
const users = require('./lib/users');
const rskapi = utils.rskapi;

const config = utils.loadConfiguration('./config.json');

const client = rskapi.client(config.host);

const name = process.argv[2];
const password = process.argv[3];

const options = utils.getConfigurationOptions(config);

const registry = utils.getAddress(config, 'registry');
const owner = utils.getAccount(config, 'registryowner');

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000000000000000000000000000";

(async function() {
    try {
        const address = await client.call(
            owner.address,
            registry,
            "nameToAddress(string)",
            [ name ],
            options
        );
        
        if (address != ZERO_ADDRESS)
            throw "User already exists";
        
        const account = users.fromNameToAccount(name, password, 'rsk_testnet');

        const txh = await client.invoke(
            owner, 
            registry, 
            "register(string,address)", 
            [ name, account.address ],
            options
        );
        
        if (txh && txh.message)
            throw txh.message;
        
        console.log('transaction', txh);
        
        const txr = await client.receipt(txh, 0);
        
        if (txr && parseInt(txr.status)) {
            config.accounts[name] = account;
            utils.saveConfiguration('./config.json', config);
            
            console.log('done');
        }
        else
            console.log('failed');
    }
    catch (ex) {
        console.log(ex);
    }
})();

