let Redis = require("ioredis");
let redis =
    process.env.ENV === "dev" ? new Redis() : new Redis(process.env.REDIS_URL);

const initialise = () => {
    redis.set("foo", "bar");
    redis.get("foo", (err, result) => {
        console.log(result);
    });
};

module.exports = {
    initialise,
};
