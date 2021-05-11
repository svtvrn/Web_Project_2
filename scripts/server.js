const express = require('express');
const nodemon = require('nodemon');
const path = require('path');
const server = express();


server.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../html', 'index.html'));
});

const PORT = process.env.PORT || 3000

server.listen(PORT, () =>{
    console.log(`Listening on da port ${PORT}...`);
});