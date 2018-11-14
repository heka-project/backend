require("dotenv").config();
let express = require("express");
let app = express();
let db = require("./db");
let users = require("../src/users");
let chains = require("../src/chains");
let middleware = require("./middleware");
let queue = require("./queue");
let mapData = require("./mapData");

// Initialise services
db.initialise();

// Middleware
app.use(
    express.static("public"),
    middleware.bodyParser.json(),
    middleware.bodyParser.urlencoded({ extended: true }),
    middleware.logger
);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.redirect("/user");
});

// User
app.get("/user", middleware.clientAuthentication, (req, res) => {
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
app.post("/user", middleware.clientAuthentication, (req, res) => {
    const { name, uid, nrics } = req.body.data;

    users.createUsers(uid, nrics, name);
    res.sendStatus(200);
});

setInterval(queue.clearQueue, 10000);
// Chain info
app.get("/chain", middleware.clientAuthentication, (req, res) => {
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

app.post("/chain", middleware.clientAuthentication, (req, res) => {
    res.sendStatus(200);
    queue.addToQueue(req.body.chain);
});

app.delete("/user/del", middleware.adminAuthentication, (req, res) => {
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
app.delete("/chain/del", middleware.adminAuthentication, (req, res) => {
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

app.get("/map", (req, res) => {
    mapData.getData().then(result => {
        res.send(result);
    });
});

app.listen(process.env.PORT, () => {
    console.log("⚡️ - Server running on port 3000");
});
