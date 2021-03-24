# Commands

Use these commands to play with the `faucet` and
`registry`, registering new users, funding them
and checking the login credentials.

YOU MUST compile the smart contracts in the project
main folder.

## Install

Install `rskcli` command tools, globally:

```
npm install -g rskclitools
```

## Setting a Host

### Using Ganache

Launch your `ganache` local node in other process.

Then, execute:

```
rskcli sethost ganache
rskcli setaccount root 0
```

Now, the `root` account is one of the `ganache` public
accounts, with enough balance to execute the next commands.

### Using RSK Regtest

Launch your `rsk` local node in other process.

Then, execute:

```
rskcli sethost regtest
rskcli setaccount root 0
```

Now, the `root` account is one of the `rsk` public
accounts, with enough balance to execute the next commands.

### Using RSK Testnet with Public Nodes

Execute:

```
rskcli sethost testnet
rskcli newaccount root
```

Then, use the [RSK Testnet Faucet](https://faucet.rsk.co/) to
get initial funding in `RBTC`.

## Setup the Accounts and Instances

Now, having defined a host and a `root` account with
funds, execute:

```
rskcli execute setup
```

This command:
- Creates and funds faucet owner account
- Creates and funds registry owner account
- Deploys a faucet instance
- Deploys a registry instance

The faucet instance can give funds to an account.

The registry instance keeps the association between
known users and their account addresses.

## Register a New User

```
rskcli execute register <username> <password>
```

Examples:
```
rskcli execute register alice rskisgreat
rskcli execute register bob inyourfaceethereum
```

The user is created, with a private key and public addresses
derived from the combination of username and password.

The association between the username and the generated
address is saved in the `registry` smart contract instance.

The password is not saved in any place.

Additionally, the created user account receives funds
from the `faucet` smart contract instance.

Check the balance with:
```
rskcli balance alice
rskcli balance bob
```

## Login

In order to check the valid username and password combination,
execute:

```
rskcli execute login <username> <password>
```

Examples:
```
rskcli execute login alice idontremember
rskcli execute login bob inyourfaceethereum
```

Possible outcomes:

- Unknown user: the user is not stored in the `registry` instance
- Invalid password: the derived address don't match the address
stored in `registry` instance
- All OK

