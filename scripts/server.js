const express = require('express');
const nodemon = require('nodemon');
const path = require('path');
const logger = require('./logger');
const server = express();


//Init middleware logger module.
server.use(logger);

//Homepage
server.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../html', 'index.html'));
});

//Server listening port.
const PORT = process.env.PORT || 3000

//Initiating the server.
server.listen(PORT, () =>{
    console.log(`Listening on da port ${PORT}...`);
});