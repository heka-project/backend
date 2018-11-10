require("dotenv").config();
let express = require("express");
var bodyParser = require("body-parser");
let app = express();
let db = require("./db");
let users = require('../src/users');
let chains = require("../src/chains");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));
app.set('view engine', 'ejs');


db.initialise();

app.get('/', (req, res) => {
    res.redirect('/user');
})

// query by id
app.get("/user", (req, res) => {
    users.getAllUsers().then((result) => {
        console.log(result);
        res.render('index', { data: result });
    })

})
app.post("/user", (req, res) => {
    const name = req.body.data.name;
    const uid = req.body.data.uid;
    const nrics = req.body.data.nrics;

    users.createUsers(uid, nrics, name);
    res.sendStatus(200);
})

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
