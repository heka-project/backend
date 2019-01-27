let queue = [];
let chains = require('../src/chains');

const addToQueue = (items) => {
    queue.push(items);
    return queue
}

const clearQueue = () => {
    let newQ = queue.reduce((acc, cur) => {
        acc[cur.md5] = cur;
        return acc;
    }, {})
    if (queue.length > 0) {
        insertUsers(newQ);
    }
    queue = [];
}

const insertUsers = (obj) => {
    let batch_id;
    let nodes;
    let current;
    let completion;
    let md5;
    let collection;

    let key = Object.keys(obj);
    key.forEach(indKey => {
        batch_id = obj[key].batch_id;
        nodes = JSON.stringify(obj[key].nodes);
        current = obj[key].current;
        completion = obj[key].completion;
        md5 = obj[key].md5;
        collection = obj[key].collection
    })
    chains.createChain(batch_id, nodes, current, completion, md5, collection);
}




module.exports = {
    addToQueue,
    clearQueue,

}