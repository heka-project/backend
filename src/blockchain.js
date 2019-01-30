const db = require("../src/db");

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

module.exports = {
    createTransaction:createTransaction
}