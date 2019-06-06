'use strict';
var express = require('express');
var router = express.Router();

/* get home page. */
router.get('/', function (req, res) {
    //debugger;
    var data = req.data;
    res.render('index', { title: 'express', currUser: data.user});
});

module.exports = router;
