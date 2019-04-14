# Faucet on RSK Testnet

The faucet contract was deployed to RSK Testnet. These are the
commands you can send to the contract, transferring valuedoing
to a new account.

## Install

Run
```
npm install
```

## Configure

Copy `config.json.example` to `config.json`:

```json
{
    "host": "https://public-node.testnet.rsk.co:443",
    "contract": "0x2ea529d70ce2de3040b2b95cf47f141547989d4a",
    "account": {
        "address": "0x<your account address>",
        "privateKey": "0x<your account private key>"
    }
}
```

Edit
the account fields (`address` and `privateKey`). If you don't
have an account or you don't know the private key, generate
one using https://github.com/ajlopez/RskUtils/tree/master/keys

You must
have balance in RSK testnet. Use [RSK Faucet](https://faucet.testnet.rsk.co/) to
get initial balance for your account.

## Commands

Transfer to account:

```
node transfer 0x<account>
```
You can transfer ONLY ONCE to an account.

Account balance:

```
node balance 0x<account>
```
Shows the account balance.

