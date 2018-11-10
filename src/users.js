let db = require('../src/db');
let flat = require('flat');

const createUsers = (uid, nrics, name) => {
    let info = flat.flatten({
        "uid": uid,
        "nrics": nrics,
        "name": name,
    });
    db.setAdd('users', uid);
    db.hmset(uid, info, (err, reply) => {
        if (err) {
            console.log(err);
        } console.log(reply);
    });
}

const getAllKeys = () => {
    return new Promise((resolve, rejext) => {
        resolve(db.setMembers('users'));
    })
}

//Still Broken
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        getAllKeys().then((result) => {
            result.forEach(indKey => {
                resolve(db.hgetall(indKey));
            });
        })
    })
}

module.exports = {
    createUsers: createUsers,
    getAllKeys: getAllKeys,
    getAllUsers: getAllUsers,
}