const express = require('express');
const router = express.Router();
const Book = require('./mongoose/bookschema');

//Edit page router.
router.get('/edit/:id', (req, res) =>{
    Book.find({ workid: req.params.id }, (err, books) =>{
        if(err){
            res.send("Book not found.");
        }else{
            book = books[0];
            res.render('edit',{
                title: 'Update Book Info',
                script: 'updatebook',
                titleweb: book.titleweb,
                authorweb: book.authorweb,
                workid: book.workid,
                comment: book.comment,
            });
        }
    })
});

module.exports = router;