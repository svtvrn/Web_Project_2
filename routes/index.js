const express = require('express');
const router = express.Router();
const Book = require('./mongoose/bookschema');

//Search page router.
router.get('/', (req, res) => res.render('index',{
  title: 'Bookworms! Find your next read!',
  script: 'fetchbooks'
}));

//Handling the requests from the front end.
router.post('/', async function(req, res){
    //Deconstructing the request into the action and data.
    let data = req.body.msg.data;
    let action = req.body.msg.action;
    //We delete any unwanted fields.
    delete data.titles;
    data.comment = "";
    //Checking which action was triggered.
    if(action === 'add'){
      let newBook = new Book(data);
      await newBook.save( err => {
        err ? res.send({msg: 'F0'}) : res.send({msg: 'S0'})
      });
    }
});

router.delete('/', async function(req, res){
  //Deconstructing the request into the action and data.
  let data = req.body.msg.data;
  let action = req.body.msg.action;
  //Checking which action was triggered.
  if(action === 'remove'){
    await Book.deleteOne({workid: parseInt(data.workid)}, err => {
      err ? res.send({msg: 'F1'}) : res.send({msg: 'S1'}) 
    });
  }
});




//Exporting the index router.
module.exports = router;