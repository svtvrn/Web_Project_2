const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');


const app = express();

//Handlebars middleware template engine.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Homepage
app.get('/', (req, res) => res.render('index'));

//app listening port.
const PORT = process.env.PORT || 3000

//Initiating the app.
app.listen(PORT, () =>{
    console.log(`Listening on da port ${PORT}...`);
});