const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const booksearch = require('./routes/booksearch');
//const MongoClient = require('mongodb').MongoClient;


const app = express();

//Connecting the Handlebars template engine, setting the default layout.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Content middleware (images, scripts, stylesheets).
app.use('/static', express.static(path.join(__dirname, 'public')));

//Express middleware to handle the URIs and the JSON files.
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/', booksearch);

//Server listening port.
const PORT = process.env.PORT || 3000
//Initiating the app.
app.listen(PORT, () =>{
    console.log(`Listening on da port ${PORT}...`);
});