require("dotenv").config();
let express = require("express");
let app = express();
let cors = require('cors');
let db = require("./db");

let server = require('http').Server(app);
let io = require('socket.io')(server);

let middleware = require("./middleware");

const routes = require('./routes/routes');

// Initialise services
db.initialise();


// Middleware
app.use(
    middleware.bodyParser.json(),
    middleware.bodyParser.urlencoded({ extended: true }),
    middleware.logger,
    cors()

);
app.set("view engine", "ejs");
app.use('/', routes);
app.set('socketio', io);
server.listen(3032, () =>{
    console.log("Listening on port 3032");
})

// app.listen(process.env.PORT, () => {
//     console.log("⚡️ - Server running on port " + process.env.PORT);
// });
