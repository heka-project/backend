let express = require("express");
let app = express();
let jsonServer = require('json-server');

app.use('/api',jsonServer.router('db.json'));

app.listen(3000, ()=>{
  console.log("You are listening on 3000");
})