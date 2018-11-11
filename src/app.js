require("dotenv").config();
let express = require("express");
var bodyParser = require("body-parser");
let app = express();
let db = require("./db");
let users = require("../src/users");
let chains = require("../src/chains");
let unflatten = require("flat").unflatten;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views"));
app.set("view engine", "ejs");

db.initialise();

app.get("/", (req, res) => {
    res.redirect("/user");
});

app.get("/user", (req, res) => {
    const queryId = req.body.queryId;
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
            res.render("index", { data: newRes });
        });
});
app.post("/user", (req, res) => {
    const { name, uid, nrics } = req.body.data;

    users.createUsers(uid, nrics, name);
    res.sendStatus(200);
});

app.get("/chain", (req, res) => {
    res.render("/chain");
});
app.post("/chain", (req, res) => {
    const batch_id = req.body.chain.batch_id;
    const nodes = req.body.chain.nodes;
    const current = req.body.chain.current;
    const completion = req.body.chain.completion;
    const md5 = req.body.chain.md5;

    chains.createChain(batch_id, nodes, current, completion, md5);
    res.sendStatus(200);
});
app.listen(process.env.PORT, () => {
    console.log("⚡️ - Server running on port 3000");
});
