const express = require('express');
const router = express.Router();
const Book = require('./mongoose/bookschema');

//Edit page router.
router.get('/edit/:id', (req, res) =>{
    Book.findOne({ workid: req.params.id }, (err, book) =>{
        if(err){
            res.send("Book not found.");
        }else{
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

//Handling an edit action, updating an existing record.
router.put('/edit/:id', async (req, res) =>{

    let data = req.body.msg.book;
    let action = req.body.msg.action;

    if(action === 'update'){
        await Book.updateOne( {workid: data.workid}, {
            $set: {
                titleweb: data.titleweb,
                authorweb: data.authorweb,
                comment: data.comment
            } 
        }, err => {
            err ? res.send('F3') : res.send('S3');
        });
    }
});

module.exports = router;