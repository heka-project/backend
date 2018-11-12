let db = require("../src/db");

const createUsers = (uid, nrics, name) => {
    let info = {
        uid: uid,
        nrics: nrics,
        name: name,
    };
    db.setAdd("users", uid);
    db.hmset(uid, info, (err, reply) => {
        if (err) {
            console.log(err);
        }
        console.log(reply);
    });
};

const getAllKeys = () => {
    return new Promise((resolve, reject) => {
        db.setMembers("users", (err, reply) => {
            if (err) {
                return reject(err);
            }
            resolve(reply);
        });
    });
};

const getAllUsers = keys => {
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
};

module.exports = {
    createUsers: createUsers,
    getAllKeys: getAllKeys,
    getAllUsers: getAllUsers,
};
