module.exports = async function (context, args) {
    const config = context.configs.loadConfiguration();
    console.log('get network gas price');
    const client = context.rskapi.client(config.host);
    const gasPrice = context.utils.getValue(await client.host().getGasPrice());
    console.log('gas price', gasPrice);
    console.log('create faucet owner account');
    await context.command('newaccount').execute([ 'faucetowner' ]);
    console.log('create registry owner account');
    await context.command('newaccount').execute([ 'registryowner' ]);
    console.log('deploying faucet');
    await context.command('deploy').execute([ 'root', 'faucet', 'Faucet', 'uint256,uint256', (gasPrice * 1000000) + ',20', '..' ]);
    console.log('setting faucet owner');
    await context.command('invoke').execute([ 'root', 'faucet', 'setOwner(address)', 'faucetowner' ]);
    console.log('funding faucet');
    await context.command('transfer').execute([ 'root', 'faucet', gasPrice * 1000000 * 1000, '-g', '100000' ]);
    console.log('funding registryowner');
    await context.command('transfer').execute([ 'root', 'registryowner', gasPrice * 1000000 * 1000 ]);
    console.log('funding faucetowner');
    await context.command('transfer').execute([ 'root', 'faucetowner', gasPrice * 1000000 * 1000 ]);
    console.log('deploying registry');
    await context.command('deploy').execute([ 'root', 'registry', 'AddressRegistry', '..' ]);
    console.log('setting registry owner');
    await context.command('invoke').execute([ 'root', 'registry', 'setOwner(address)', 'registryowner' ]);
}