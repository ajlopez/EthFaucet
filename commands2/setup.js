module.exports = async function (context, args) {
    console.log('create faucet owner account');
    await context.command('newaccount').execute([ 'faucetowner' ]);
    console.log('create registry owner account');
    await context.command('newaccount').execute([ 'registryowner' ]);
    console.log('deploying faucet');
    await context.command('deploy').execute([ 'root', 'faucet', 'Faucet', 'uint256,uint256', '60000000000000,20', '..' ]);
    console.log('setting faucet owner');
    await context.command('invoke').execute([ 'root', 'faucet', 'setOwner(address)', 'faucetowner' ]);
    console.log('funding faucet');
    await context.command('transfer').execute([ 'root', 'faucet', '3000000000000000', '-g', '100000' ]);
    console.log('funding registryowner');
    await context.command('transfer').execute([ 'root', 'registryowner', '3000000000000000' ]);
    console.log('funding faucetowner');
    await context.command('transfer').execute([ 'root', 'faucetowner', '3000000000000000' ]);
    console.log('deploying registry');
    await context.command('deploy').execute([ 'root', 'registry', 'AddressRegistry', '..' ]);
    console.log('setting registry owner');
    await context.command('invoke').execute([ 'root', 'registry', 'setOwner(address)', 'registryowner' ]);
}