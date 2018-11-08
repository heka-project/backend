require("dotenv").config();
let express = require("express");
var bodyParser = require("body-parser");
let app = express();
let db = require("./db");
let users = require('../src/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));
app.set('view engine', 'ejs');


db.initialise();

app.get('/', (req, res) => {
    res.redirect('/users');
})

// query by id
app.get("/user", (req, res) => {
    users.getAllUsers();
    res.render('index');
});

app.post("/user", (req, res) => {
    const name = req.body.data.name;
    const uid = req.body.data.uid;
    const nrics = req.body.data.nrics;

    users.createUsers(uid, nrics, name);
    res.sendStatus(200);
})
app.listen(process.env.PORT, () => {
    console.log("⚡️ - Server running on port 3000");
});
