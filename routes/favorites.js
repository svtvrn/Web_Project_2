const express = require('express');
const router = express.Router();
const Book = require('./mongoose/bookschema');
const edit = require('./edit');


router.use('/favorites',edit);

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

    if(action === 'remove'){
        await Book.deleteOne({workid: parseInt(data)}, err => {
            err ? res.send({msg: 'F1'}) : res.send({msg: 'S1'}) 
          });
    }else if (action === 'filter'){
        await Book.find(
        { $and: [
            {authorweb: { $not: {$regex: `${data}`, $options: 'i'}}},
            {titleweb: { $not: {$regex: `${data}`, $options: 'i'}}},
        ]},{workid: 1, _id: 0}, (err, books) =>{
            if(err){
                return res.send({msg: 'F2'});
            }else{
                return res.send({msg: books});
            }
        });
    }
});


module.exports = router;