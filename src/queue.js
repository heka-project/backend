let queue = [];
let filteredQueue = [];

const addToQueue = (items) => {
    queue.push(items);
    return queue
}

const clearQueue = () => {
    let newQ = queue.reduce((acc, cur)=>{
        acc[cur.md5] = cur;
        return acc;
    }, {})
    console.log(newQ)
}




module.exports = {
    addToQueue,
    displayQueue,
    clearQueue,

}