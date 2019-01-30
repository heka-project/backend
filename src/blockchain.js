const db = require("../src/db");

let block = 
    {
        index:0,
        prevHash:0,
        hash:null,
        nonce:0,
        transaction:[],
    };

const createTransaction = (id,from, to, location)=>{
    let transaction = {
        id:id,
        from: from,
        to: to,
        location: location,
    }

    db.setAdd("transaction",id);
    db.hmset(id, transaction, (err, reply) => {
        if(err){
            console.log(err)
        }
        console.log(reply);
    })

}

const addToBlock = (id,from, to, location) =>{
    let transaction = {
        id:id,
        from: from,
        to: to,
        location: location,
    }
    
    block.transaction.push(transaction);
    db.setAdd("block", block.index);
    db.hmset(block.index, block,(err, reply)=>{
        if(err){
            console.log(err);
        }console.log(reply);
    })
    return block
}

const getBlock = () =>{
    return block;
}

module.exports = {
    createTransaction,
    addToBlock,
    getBlock,
}