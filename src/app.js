require("dotenv").config();
let express = require("express");
let app = express();

let db = require("./db");
let users = require("../src/users");
let chains = require("../src/chains");
let middleware = require("./middleware");
let queue = require("./queue");

// Initialise services
db.initialise();

// Middleware
app.use(
    express.static("public"),
    middleware.bodyParser.json(),
    middleware.bodyParser.urlencoded({ extended: true }),
    middleware.logger,
    middleware.basicAuthentication
);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.redirect("/user");
});

// User
app.get("/user", (req, res) => {
    console.info("What thue fuck")
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
app.post("/user", (req, res) => {
    const { name, uid, nrics } = req.body.data;

    users.createUsers(uid, nrics, name);
    res.sendStatus(200);
});

setInterval(queue.clearQueue, 10000);
// Chain info
app.get("/chain", (req, res) => {
    let id;
    chains.getChainKey().then((keys) => {
        return keys
    }).then((key) => {
        id = key;
        return chains.getAllChain(key);
    }).then((results) => {
        let finRes = {};
        for (let i = 0; i < results.length; i++) {
            results[i]["nodes"] = results[i]["nodes"].split(",");
            finRes[id[i]] = results[i];
        };
        res.setHeader('Content-Type', 'application/json');
        res.send(finRes);
    });
})

app.post("/chain", (req, res) => {
    const { batch_id, nodes, current, completion, md5 } = req.body.chain;
    res.sendStatus(200);
    queue.addToQueue({ batch_id, nodes, current, completion, md5 });
    queue.displayQueue();
});


app.listen(process.env.PORT, () => {
    console.log("⚡️ - Server running on port 3000");
});
