const users = require('./lib/users');

module.exports = async function (context, args) {
    const configs = context.configs;
    const utils = context.utils;
    const config = configs.loadConfiguration();
    
    const username = args[0];
    
    console.log('funding user');
    await context.command('invoke').execute([ 'faucetowner', 'faucet', 'transferToAddress(address)', username ]);
    console.log('done');
}

