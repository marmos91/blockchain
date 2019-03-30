const {SHA256} = require('crypto-js');

class Transaction
{
    constructor(from, to, amount)
    {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.timestamp = Date.now();
    }

    calculate_hash() 
    {
        return SHA256(this.from + this.to + this.amount + this.timestamp).toString();
    }

    is_valid()
    {
        if (this.from === null) 
            return true;

        return true;
    }
}

class Block
{
    constructor(timestamp, transactions, previous_hash = '')
    {
        this.timestamp = timestamp;
        this.previous_hash = previous_hash;
        this.transactions = transactions;
        this.nonce = 0;
        this.hash = this.calculate_hash();
    }

    calculate_hash()
    {
        return SHA256(this.timestamp + this.previous_hash + JSON.stringify(this.transactions) + this.nonce).toString();
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

    has_valid_transactions() 
    {
        for (const transaction of this.transactions) 
        {
            if (!transaction.isValid())
                return false;
        }
    
        return true;
    }
    
}

class Blockchain
{
    constructor(difficulty = 2)
    {
        this.chain = [this.create_genesis_block()];
        this.difficulty = difficulty;
        this.pending_transactions = [];
        this.mining_reward = 100;
        
        console.log('Blockchain created with difficulty:', this.difficulty, 'and mining reward:', this.mining_reward);
    }
    
    create_genesis_block()
    {
        return new Block(Date.parse('2017-01-01'), [], '0');
    }

    get_last_block()
    {
        return this.chain[this.chain.length - 1];
    }

    add_transaction(transaction)
    {
        if(!transaction.from || !transaction.to)
            throw new Error('Transaction must include from and to address');
        
        if (!transaction.is_valid()) 
            throw new Error('Cannot add invalid transaction to chain');
        
        this.pending_transactions.push(transaction);
    }

    mine_pending_transactions(reward_address)
    {
        let reward_transaction = new Transaction(null, reward_address, this.mining_reward)
        this.pending_transactions.push(reward_transaction);

        let new_block = new Block(Date.now(), this.pending_transactions, this.get_last_block().hash);
        new_block.mine(this.difficulty);

        this.chain.push(new_block);
        this.pending_transactions = [];
    }

    get_balance(address)
    {
        let balance = 0;
        for(const block of this.chain)
        {
            for(const transaction of block.transactions)
            {
                if(transaction.from === address)
                    balance -= transaction.amount;

                if(transaction.to === address)
                    balance += transaction.amount;
            }
        }
        return balance;
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

            if (!current_block.has_valid_transactions())
                return false;

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

module.exports = {Blockchain, Block, Transaction};
