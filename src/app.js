require("dotenv").config();
let express = require("express");
let app = express();
let cors = require("cors");
let db = require("./db");

let http = require("http").createServer();
let io = require("socket.io")(http);

let middleware = require("./middleware");

const routes = require("./routes/routes");

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
app.use("/", routes);

let socket_id = [];
io.on("connection", socket => {
    socket_id.push(socket.id);
    if (socket_id[0] === socket.id) {
        // remove the connection listener for any subsequent
        // connections with the same ID
        io.removeAllListeners("connection");
    }

    // Send genesis block to miners
    io.emit("GENESIS_BLOCK", {
        index: 0,
        prevHash: "000000000",
        hash: null,
        nonce: 0,
        transactions: [],
    });
    socket.on("SOLVED", block => {
        console.log(`Recevied solve ${block}`);
    });
});

http.listen(3032);
app.listen(process.env.PORT, () => {
    console.log("⚡️ - App running on port " + process.env.PORT);
});
