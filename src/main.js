const {Block, Blockchain} = require('./blockchain');

let my_coin = new Blockchain();

console.log('Mining block 1');
my_coin.add_block(new Block(Date.now(), {amount: 2}));

console.log('Mining block 2');
my_coin.add_block(new Block(Date.now(), {amount: 5}));
