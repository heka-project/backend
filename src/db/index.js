let Redis = require("ioredis");
let redis =
    process.env.ENV === "dev" ? new Redis() : new Redis(process.env.REDIS_URL);

const initialise = () => {
    if (process.env.ENV === "dev") {
        //redis.flushdb();
    }
};

// String operations
const set = (key, data) => redis.set(key, value);
const get = (key, callback) => redis.get(key, callback);

//Set operations
const setAdd = (key, value) => {
    redis.sadd(key, value);
}
const setMembers = (key) => redis.smembers(key);




//Hashmap
const hmset = (key, values, callback) =>{
    redis.hmset(key, values, callback);
}

const hgetall = (key)=>{
    return new Promise((resolve, reject)=>{
        resolve(redis.hgetall(key));
    })
}





// List operations
const pushList = async (key, data) => {
    try {
        const result = await redis.rpush(key, JSON.stringify(data));
    } catch (err) {
        console.log(err);
    }
};
const getList = async (key, callback, limit = 0) => {
    try {
        const result = await redis.lrange(key, 0, limit - 1);
        callback(null, result);
    } catch (err) {
        console.log(err);
        callback(err, null);
    }
};

module.exports = {
    initialise,
    set,
    get,
    pushList,
    getList,
    setAdd,
    hmset,
    setMembers,
    hgetall
};
