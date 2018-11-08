let db = require('../src/db');
let flat = require('flat');

const createUsers = (uid, nrics, name) => {
    let info = flat.flatten({
        "uid": uid,
        "nrics": nrics,
        "name": name,
    });
    db.setAdd('users', uid,(err, reply)=>{
        console.log(err)
    });
    db.hmset(uid, info, (err, reply) => {
        console.log(`MARK ${reply}`);
    });
}

const getAllUsers = () => {
    db.setMembers('users', (err, reply)=>{
        if(err){
            console.log(err);
        }console.log(reply)
    })
}
module.exports = {
    createUsers: createUsers,
    getAllUsers: getAllUsers,
}