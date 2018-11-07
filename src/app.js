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

// app.post("/examplePOST", (req, res) => {
//     console.log(req.body.data);
//     db.push("example", req.body.data);
//     db.getList("example", (err, result) => {
//         console.log(result);
//         res.send(JSON.stringify(result));
//     });
// });

app.listen(process.env.PORT, () => {
    console.log("⚡️ - Server running on port 3000");
});
