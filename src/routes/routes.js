const express = require("express");
const router = express.Router();
let middleware = require("../middleware");
let queue = require("../queue");
let mapData = require("../mapData");
let users = require("../../src/users");
let chains = require("../../src/chains");
let blockchain = require("../../src/blockchain");

// User
router.get("/user", middleware.clientAuthentication, (req, res) => {
    const queryId = req.query.queryId;
    users
        .getAllKeys()
        // If query, filter keys
        .then(keys => (!queryId ? keys : keys.filter(x => x === queryId)))
        .then(keys => {
            return users.getAllUsers(keys);
        })
        .then(results => {
            res.setHeader("Content-Type", "application/json");
            let newRes = Object.assign(
                {},
                results.map(e => {
                    e["nrics"] = e["nrics"].split(",");
                    return e;
                })
            );
            res.send(newRes);
        });
});
router.post("/user", middleware.clientAuthentication, (req, res) => {
    const { name, uid, nrics } = req.body.data;
    users.createUsers(uid, nrics, name);
    res.sendStatus(200);
});

setInterval(queue.clearQueue, 10000);
// Chain info
router.get("/chain", middleware.clientAuthentication, (req, res) => {
    let id;
    chains
        .getChainKey()
        .then(keys => {
            return keys;
        })
        .then(key => {
            id = key;
            return chains.getAllChain(key);
        })
        .then(results => {
            let finRes = {};
            for (let i = 0; i < results.length; i++) {
                results[i]["nodes"] = eval(results[i]["nodes"]);
                finRes[id[i]] = results[i];
            }
            res.setHeader("Content-Type", "application/json");
            res.send(finRes);
        });
});

router.post("/chain", middleware.clientAuthentication, (req, res) => {
    res.sendStatus(200);
    queue.addToQueue(req.body.chain);
});

router.post("/transaction", (req, res) => {
    const { id, from, to, location } = req.body.data;

    blockchain.addToBlock(id, from, to, location);
    res.sendStatus(200);
});

router.get("/transaction", (req, res) => {
    res.send(blockchain.getBlock());
});
// Delete
router.delete("/user", middleware.adminAuthentication, (req, res) => {
    users
        .getAllKeys()
        .then(keys => {
            return keys;
        })
        .then(key => {
            key.forEach(x => {
                users.delUsers(x);
                res.send("ok");
            });
        });
});
router.delete("/chain", middleware.adminAuthentication, (req, res) => {
    chains
        .getChainKey()
        .then(keys => {
            return keys;
        })
        .then(key => {
            key.forEach(x => {
                chains.delChain(x);
                res.send("ok");
            });
        });
});

router.get("/map", (req, res) => {
    mapData.getData().then(result => {
        res.send(result);
    });
});

module.exports = router;
