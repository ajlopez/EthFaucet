const users = require('./lib/users');

module.exports = async function (context, args) {
    const configs = context.configs;
    const utils = context.utils;
    const ethutil = context.require('ethereumjs-util');    
    
    users.useEthUtil(ethutil);

    const username = args[0];
    const password = args[1];
    
    console.log('check username');
    let address = await context.command('call').execute([ 'root', 'registry', 'nameToAddress(string)', "'" + username + "'" , 'address' ]);
    
    if (!address)
        throw "User does not exist";

    if (address.length >= 40)
        address = '0x' + address.substring(address.length - 40);
        
    console.log('check password');
    // TODO calculate prefix
    const account = users.fromNameToAccount(username, password, 'rsk_testnet');
    
    if (address.toLowerCase() !== account.address.toLowerCase())
        throw "Invalid password";
        
    console.log('done');
}

