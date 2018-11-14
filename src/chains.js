let db = require('../src/db');

const createChain = (batch_id, nodes, current, completion, md5) => {
    let chainInfo = {
        "batch_id": batch_id,
        "nodes": nodes,
        "current": current,
        "completion": completion,
        "md5": md5
    };

    db.setAdd('chains', batch_id);
    db.hmset(batch_id, chainInfo, (err, reply) => {
        if (err) {
            console.log(err);
        } console.log(reply);
    })
}

const getChainKey = () => {
    return new Promise((resolve, reject) => {
        db.setMembers("chains", (err, reply) => {
            if (err) {
                return reject(err)
            }
            resolve(reply)
        })
    })
}

const getAllChain = (keys) => {
    promise = [];
    keys.forEach(indKey => {
        promise.push(
            new Promise((resolve, reject) => {
                db.hgetall(indKey, (err, reply) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(reply);
                });
            })
        );
    });
    return Promise.all(promise);
}



module.exports = {
    createChain: createChain,
    getAllChain: getAllChain,
    getChainKey:getChainKey,

}