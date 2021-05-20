const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const index = require('./routes/index');
const favorites = require('./routes/favorites');

const app = express();

//Connecting the Handlebars template engine, setting the default layout.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Content middleware (images, scripts, stylesheets).
app.use('/static', express.static(path.join(__dirname, 'public')));

//Express middleware to handle the URIs and the JSON files.
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Search page router.
app.use('/', index);
//Favorites page router.
app.use('/', favorites);


//Server listening port.
const PORT = process.env.PORT || 3000
//Initiating the app.
app.listen(PORT, () =>{
    console.log(`Listening on da port ${PORT}...`);
});