const express = require('express');
const router = express.Router();
const Book = require('./mongoose/bookschema');


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
            books
        });
    });
}); 

module.exports = router;