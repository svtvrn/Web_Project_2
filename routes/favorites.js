const express = require('express');
const router = express.Router();
const Book = require('./mongoose/bookschema');


router.get('/favorites', (req, res) => { 
    Book.find({}, (error, books)=>{
        res.render('favorites',{title: 'Bookworms! Fave Books', books: books});
    });
});

module.exports = router;