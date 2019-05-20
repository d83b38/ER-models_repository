'use strict';
var express = require('express');
var router = express.Router();

/* get home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'express' });
});

router.post('/num', function (req, res) {
    var num = req.body.value;
    console.log(num+'received');
    return res.end('done');
});

module.exports = router;
