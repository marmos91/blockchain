const {Block, Blockchain} = require('./blockchain');

let my_coin = new Blockchain();

my_coin.add_block(new Block(Date.now(), {name: 'Marco'}));
my_coin.add_block(new Block(Date.now(), {surname: 'Moschettini'}));

console.log(JSON.stringify(my_coin, null, 4));

console.log('Chain is valid?', my_coin.is_valid());

// Trying to modify data
my_coin.chain[1].data = {name: 'Luca'};

console.log('Chain is valid?', my_coin.is_valid());
