let db = require('../src/db');
let flat = require('flat');

const createChain = (batch_id, nodes, current, completion, md5)=>{
    let chainInfo = flat.flatten({
        "batch_id":batch_id,
        "nodes":nodes,
        "current":current,
        "completion":completion,
        "md5":md5
    });

    db.setAdd('chains', batch_id);
    db.hmset(batch_id, chainInfo,(err,reply)=>{
        if(err){
            console.log(err);
        }console.log(reply);
    })
}



module.exports = {
    createChain:createChain,
}