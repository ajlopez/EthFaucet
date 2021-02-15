
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

(async function() {
    try {
        const account = users.fromNameToAccount(name, password, 'rsk_testnet');

        const address = await client.call(
            owner.address,
            registry,
            "nameToAddress(string)",
            [ name ],
            options
        );
        
        if (address == '0x000000000000000000000000' + account.address.substring(2))
            console.log('done');
        else
            console.log('failed');
    }
    catch (ex) {
        console.log(ex);
    }
})();

