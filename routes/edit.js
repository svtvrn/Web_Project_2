const express = require('express');
const router = express.Router();
const Book = require('./mongoose/bookschema');

//Edit page router.
router.get('/edit/:id', (req, res) =>{
    res.render('edit',{
        title: 'Update Book Info',
        script: 'updatebook'
    });
});

module.exports = router;