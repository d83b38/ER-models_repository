'use strict';
var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/authController');

/* get home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'express' });
});

router.post('/num', function (req, res) {
    var num = req.body.value;
    console.log(num+'received');
    return res.end('done');
});

//router.get('/login', auth_controller.userLogin_get);
//router.post('/login', auth_controller.userLogin_post);
//router.post('/logout', auth_controller.userLogout_post);
//router.get('/register', auth_controller.userRegister_get);
//router.post('/register', auth_controller.userRegister_post);
module.exports = router;
