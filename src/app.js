require("dotenv").config();
let express = require("express");
let app = express();
let db = require("./db");

let middleware = require("./middleware");

const routes = require('./routes/routes');

// Initialise services
db.initialise();


// Middleware
app.use(
    middleware.bodyParser.json(),
    middleware.bodyParser.urlencoded({ extended: true }),
    middleware.logger
);
app.set("view engine", "ejs");

app.use('/', routes);
app.listen(process.env.PORT, () => {
    console.log("⚡️ - Server running on port " + process.env.PORT);
});
