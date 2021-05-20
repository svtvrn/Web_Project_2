const express = require('express');
const router = express.Router();
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

//Search page router.
router.get('/', (req, res) => res.render('index'));

router.post('/', async function(req, res){
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

module.exports = router;