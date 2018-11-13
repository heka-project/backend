let queue = [];

const addToQueue = (items) => {
    queue.push(items);
}
const displayQueue = () =>{
    console.log(queue);
}
module.exports = {
    addToQueue,
    displayQueue

}