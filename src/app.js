require("dotenv").config();
let express = require("express");
let cors = require("cors");
let db = require("./db");
let socketIO = require("socket.io");

let middleware = require("./middleware");

const routes = require("./routes/routes");

// Initialise services
db.initialise();

// Middleware
let app = express()
    .use(
        middleware.bodyParser.json(),
        middleware.bodyParser.urlencoded({ extended: true }),
        middleware.logger,
        cors()
    )
    .set("view engine", "ejs")
    .use("/", routes)
    .listen(process.env.PORT, () => {
        console.log("⚡️ - App running on port " + process.env.PORT);
    });

const io = socketIO(app);
let socket_id = [];
io.on("connection", socket => {
    socket_id.push(socket.id);
    if (socket_id[0] === socket.id) {
        // remove the connection listener for any subsequent
        // connections with the same ID
        io.removeAllListeners("connection");
    }

    // Send genesis block to miners
    io.emit("NEW_BLOCK", {
        index: 0,
        prevHash: "000000000",
        hash: null,
        nonce: 0,
        transactions: [],
    });

    socket.on("SOLVED", block => {
        console.log(`Recevied solve ${block}`);
        socket.emit("VALIDATE_BLOCK", block);
    });
});
