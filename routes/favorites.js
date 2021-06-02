const express = require('express');
const router = express.Router();
const Book = require('./mongoose/bookschema');
const edit = require('./edit');

//Sub-routing "edit" to "favorites".
router.use('/favorites',edit);

//Favorites page router.
router.get('/favorites', (req, res) => { 
    Book.find({}, (error, books)=>{
        books = books.map((book)=>{
            return {
                titleweb: book.titleweb,
                authorweb: book.authorweb,
                workid: book.workid,
                comment: book.comment
            }
        });
        if(!error) res.render('favorites',{ 
            title: 'Bookworms! Fave Books', 
            books,
            script: 'managefaves'
        });
    });
}); 

router.post('/favorites', async function(req, res) {

    var data = req.body.msg.data;
    var action = req.body.msg.action;
    //Checking which action was triggered.
    if(action === 'remove'){
        await Book.deleteOne({workid: parseInt(data)}, err => {
            err ? res.send({msg: 'F1'}) : res.send({msg: 'S1'}) 
          });
    }else if (action === 'filter'){
        //Finding all books that don't match the filter and return their ids.
        await Book.find(
        { $and: [
            {authorweb: { $not: {$regex: `${data}`, $options: 'i'}}},
            {titleweb: { $not: {$regex: `${data}`, $options: 'i'}}},
        ]},{workid: 1, _id: 0}, (err, books) =>{
            err ? res.send({msg: 'F2'}) : res.send({msg: books})
        });
    }
});


module.exports = router;