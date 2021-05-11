const express = require('express');
const nodemon = require('nodemon');
const server = express();

server.get('/', (req, res) =>{
    res.send("PeepeePooopoo");
});

server.listen(3000, () =>{
    console.log("Listening on da port 3000...");
});