'use strict';
var express = require('express');
var router = express.Router();

/* get home page. */
router.get('/', function (req, res) {
    //debugger;
    var data = req.data;
    res.render('index', { title: 'express', currUser: data.user});
});

router.post('/num', function (req, res) {
    var num = req.body.value;
    console.log(num+'received');
    return res.end('done');
});

module.exports = router;
