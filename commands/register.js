const users = require('./lib/users');

module.exports = async function (context, args) {
    const configs = context.configs;
    const utils = context.utils;
    const ethutil = context.require('ethereumjs-util');    
    
    users.useEthUtil(ethutil);
    
    const username = args[0];
    const password = args[1];
    
    console.log('check username availability');
    const address0 = await context.command('call').execute([ 'root', 'registry', 'nameToAddress(string)', "'" + username + "'" , 'address' ]);
    
    if (address0)
        throw "User already exists";

    // TODO calculate prefix
    const account = users.fromNameToAccount(username, password, 'rsk_testnet');

    console.log('register username');
    await context.command('invoke').execute([ 'registryowner', 'registry', 'register(string,address)', '"' + username + '",' + account.address ]);
    console.log('address', account.address);
    console.log('funding user');
    await context.command('invoke').execute([ 'faucetowner', 'faucet', 'transferToAddress(address)', username ]);
    console.log('done');
    
    const config = configs.loadConfiguration();
    
    config.accounts[username] = account;
    
    configs.saveConfiguration(config);
    
    return account;
}

