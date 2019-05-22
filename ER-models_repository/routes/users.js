'use strict';
var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/authController');

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});


router.get('/login', auth_controller.userLogin_get);
router.post('/login', auth_controller.userLogin_post);
router.post('/logout', auth_controller.userLogout_post);
router.get('/register', auth_controller.userRegister_get);


router.post('/register', auth_controller.userRegister_post);


router.get('/user_info', auth_controller.userInfo_get);

module.exports = router;
