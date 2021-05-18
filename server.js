const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');


const app = express();

//Mongo Database URI.
const MONGO_URI = "mongodb+srv://Nikos:auebwebproject2021@aueb.iu3fe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//Initiating mongoose connection.
mongoose.connect(MONGO_URI, {
 useNewUrlParser: true,
 useUnifiedTopology: true
});
//Return message if succesfully connected.
mongoose.connection.on('connected', ()=>{
  console.log("Connected to database!");
});

//Initializing our schema.
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  authorweb: String,
  onsaledate: Date,
  titleAuth: String,
  titleSubtitleAuth: String,
  titleshort: String,
  titleweb: String,
  workid: Number
});

//Model
const Book = mongoose.model('book', BookSchema);


//Connecting the Handlebars template engine.
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
  console.log(req.body.msg.action);
});


//Server listening port.
const PORT = process.env.PORT || 3000
//Initiating the app.
app.listen(PORT, () =>{
    console.log(`Listening on da port ${PORT}...`);
});