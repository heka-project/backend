require("dotenv").config();
let express = require("express");
var bodyParser = require("body-parser");
let app = express();
let db = require("./db");

app.use(bodyParser.json());

db.initialise();

app.get("/", (req, res) => {
    res.send(200);
});

app.listen(process.env.PORT, () => {
    console.log("App running on port 3000");
});
