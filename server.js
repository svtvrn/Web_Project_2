const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
//const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');


const app = express();

//Mongo Database URI.
const MONGO_URI = "mongodb+srv://Nikos:auebwebproject2021@aueb.iu3fe.mongodb.net/Aueb-Projects?retryWrites=true&w=majority";
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
  workid: {type: Number, unique: true}
});

//Creating our DB model.
const Book = mongoose.model('Penguin Random House', BookSchema);


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

app.post('/', async function(req, res){
  //Deconstructing the request into the action and data.
  var data = req.body.msg.data;
  var action = req.body.msg.action;
  //We delete any unwanted fields.
  delete data.titles;
  //Checking which action was triggered.
  if(action === 'add'){
    var newBook = new Book(data);
    await newBook.save( err => {
      err ? res.send({msg: 'F0'}) : res.send({msg: 'S1'})
    });
  }else if(action === 'remove'){
    await Book.deleteOne({workid: parseInt(data.workid)}, err => {
      err ? res.send({msg: 'F1'}) : res.send({msg: 'S1'}) 
    });
  }
});


//Server listening port.
const PORT = process.env.PORT || 3000
//Initiating the app.
app.listen(PORT, () =>{
    console.log(`Listening on da port ${PORT}...`);
});