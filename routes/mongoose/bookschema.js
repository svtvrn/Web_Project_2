const mongoose = require('mongoose');

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

//Creating our DB model through Mongoose.
const Book = mongoose.model('Penguin Random House', BookSchema);

module.exports = Book;

