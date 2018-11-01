let express = require('express');
let app = express();
let jsonServer = require('json-server');
let fs = require('fs');
let db = require('../db');

//init db
db.initialise();
const userEndpoint = jsonServer.router('db/users.json');

app.use(express.static('db.json'));
app.use('/users', userEndpoint);

app.get('/', function(res, req) {
    req.redirect('/data/employees');
});

app.listen(3000, () => {
    console.log('You are listening on 3000');
});
