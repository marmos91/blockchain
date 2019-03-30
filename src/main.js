const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const key = ec.keyFromPrivate('7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf');

const wallet = key.getPublic('hex');

let my_coin = new Blockchain(4);

let transaction1 = new Transaction(wallet, 'address2', 5);
transaction1.sign(key);
my_coin.add_transaction(transaction1);

let transaction2 = new Transaction(wallet, 'address2', 50);
transaction2.sign(key);
my_coin.add_transaction(transaction2);

my_coin.mine_pending_transactions(wallet);

console.log('My wallet balance', my_coin.get_balance(wallet));
console.log('Address 2 balance', my_coin.get_balance('address2'));
