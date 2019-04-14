const rskapi = require('rskapi');
const config = require('./config.json');

const host = rskapi.host(config.host);

const account = process.argv[2];

(async function() {
    const balance = parseInt(await host.getBalance(account));
    console.log('balance', balance);
})();

