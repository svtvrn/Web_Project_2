const express = require('express');
const router = express.Router();
const Book = require('./mongoose/bookschema');

router.get('/favorites', (req, res) => res.render('favorites',{title: 'Bookworms! Fave Books'}));

module.exports = router;