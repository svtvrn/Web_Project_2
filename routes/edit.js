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

router.post('/edit/:id', (req, res) =>{

    var data = req.body.msg.book;
    var action = req.body.msg.action;

    if(action === 'update'){
        console.log(data);
        Book.updateOne( {workid: data.workid}, {
            $set: {titleweb: data.titleweb},
            $set: {authorweb: data.authorweb}, 
            $set: {comment: data.comment} 
        }, err => {
            err ? res.send('F3') : res.send('S3');
        });
    }else{
        res.end();
    }

});

module.exports = router;