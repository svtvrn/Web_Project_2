const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/favorites', (req, res) => res.render('favorites'));

module.exports = router;