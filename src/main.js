const {Blockchain, Transaction} = require('./blockchain');

let my_coin = new Blockchain(4);

my_coin.add_transaction(new Transaction('address1', 'address2', 5));
my_coin.add_transaction(new Transaction('address1', 'address2', 50));
my_coin.add_transaction(new Transaction('address2', 'address1', 25));

my_coin.mine_pending_transactions('miner');

console.log('Address 1 balance', my_coin.get_balance('address1'));
console.log('Address 2 balance', my_coin.get_balance('address2'));
console.log('Miner balance', my_coin.get_balance('miner'));
