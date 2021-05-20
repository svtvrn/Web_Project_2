const express = require('express');
const router = express.Router();
const Book = require('./mongoose/bookschema');

//Search page router.
router.get('/', (req, res) => res.render('index'));

//Handling the requests from the front end.
router.post('/', async function(req, res){
    //Deconstructing the request into the action and data.
    var data = req.body.msg.data;
    var action = req.body.msg.action;
    //We delete any unwanted fields.
    delete data.titles;
    data.userReview = "";
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

//Exporting the index router.
module.exports = router;