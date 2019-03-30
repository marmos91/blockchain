const {SHA256} = require('crypto-js');

class Block
{
    constructor(timestamp, data, previous_hash = '')
    {
        this.timestamp = timestamp;
        this.previous_hash = previous_hash;
        this.data = data;
        this.nonce = 0;
        this.hash = this.calculate_hash();
    }

    calculate_hash()
    {
        return SHA256(this.timestamp + this.previous_hash + JSON.stringify(this.data) + this.nonce).toString();
    }   

    mine(difficulty)
    {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) 
        {
            this.nonce++;
            this.hash = this.calculate_hash();
        }
    
        console.log('Block mined:', this.hash);
    }
}

class Blockchain
{
    constructor()
    {
        this.chain = [this.create_genesis_block()];
        this.difficulty = 2;
    }
    
    create_genesis_block()
    {
        return new Block(Date.parse('2017-01-01'), {}, '0');
    }

    get_last_block()
    {
        return this.chain[this.chain.length - 1];
    }

    add_block(new_block)
    {
        new_block.previous_hash = this.get_last_block().hash;
        new_block.mine(this.difficulty);

        this.chain.push(new_block);
    }

    is_valid() 
    {
        const genesis = this.create_genesis_block();

        if(JSON.stringify(genesis) !== JSON.stringify(this.chain[0]))
            return false;

        for (let i = 1; i < this.chain.length; i++) 
        {
            const current_block = this.chain[i];
            const previous_block = this.chain[i - 1];

            if(current_block.hash !== current_block.calculate_hash()) 
                return false;

            if(current_block.previous_hash !== previous_block.calculate_hash()) 
                return false;
        }

        return true;
    }

    print()
    {
        console.log(JSON.stringify(this, null, 4));
    }
}

module.exports = {Blockchain, Block};
