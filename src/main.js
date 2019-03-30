const {Block, Blockchain} = require('./blockchain');

let my_coin = new Blockchain();

console.log('Mining block 1');
my_coin.add_block(new Block(Date.now(), {name: 'Marco'}));

console.log('Mining block 2');
my_coin.add_block(new Block(Date.now(), {surname: 'Moschettini'}));
