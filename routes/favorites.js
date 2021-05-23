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
            books,
            script: 'managefaves'
        });
    });
}); 

router.post('/favorites', async function(req, res) {

    var data = req.body.msg.data;
    var action = req.body.msg.action;
    console.log(data);
    if(action === 'remove'){
        await Book.deleteOne({workid: parseInt(data)}, err => {
            err ? res.send({msg: 'F1'}) : res.send({msg: 'S1'}) 
          });
    }else if (action === 'filter'){
        var filterResults = await Book.find({
            authorweb: `/${data}/`,
            titleweb: `/${data}/`
        })
        .catch(err => {
            console.log(err);
        });
        console.log(filterResults);
        return res.end();
    }
});

module.exports = router;