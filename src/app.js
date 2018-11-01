let express = require('express');
let app = express();
let jsonServer = require('json-server');
let fs = require('fs');
let db = require('../db');
let path = require('path');

//init db
db.initialise();

//route to user.json
const userEndpoint = jsonServer.router('db/users.json');

//app.use(express.static(path.join(__dirname, '../db/user.json')));

app.get('/', function (req, res) {
    res.redirect('/users');
});

app.listen(3000, () => {
    console.log('You are listening on 3000');
});

app.use(userEndpoint);