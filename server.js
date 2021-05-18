const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');


const app = express();

//Handlebars middleware template engine.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Content middleware (images, scripts, stylesheets).
app.use('/static', express.static(path.join(__dirname, 'public')));
//Express middleware to handle the URIs and the JSON files.
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Homepage, gets the handlebars view.
app.get('/', (req, res) => res.render('index'));

app.post('/', function(req, res){
  console.log(req.body.msg.data);
});


//Mongo Database URI.
const uri = "mongodb+srv://Nikos:Allweloveweleavebehind99@aueb.iu3fe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//Initiating mongo client.
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//Establishing connection to our database.
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//Server listening port.
const PORT = process.env.PORT || 3000

//Initiating the app.
app.listen(PORT, () =>{
    console.log(`Listening on da port ${PORT}...`);
});