'use strict';
var express = require('express');
var router = express.Router();
var async = require('async');
var multiparty = require('multiparty');
var userLoad = require('../routes/userLoad');
var User = require('../models/user');

router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.get('/login', function (req, res) {

    res.render('login', { title: 'login', info:'' });
});

router.post('/login', async function (req, res) {
    var form = new multiparty.Form();
    var data = req.data;
    form.parse(req, async function (err, fields, files) {
        if (fields) {
            var login = fields.login[0];
            var password = fields.password[0];
            if (login && password) {
                var currentUser = await userLoad.checkLogin(login, password);
                if (currentUser.isAuth) {
                    console.log('udachno');
                    var secret = req.app.get('secret');
                    var token = userLoad.getToken(currentUser.user, secret);
                    res.cookie('authToken', token);
                    //res.redirect('/users/user_info' );
                    res.redirect('/');
                }
                else {
                    console.log('neudachno');
                    res.render('login', { title: 'login', info: 'invalid login or password' });
                }
            }
            else {
                res.render('login', { title: 'login', info: 'erorr' });
            }
        }
    });
});

router.get('/register', function (req, res) {
    res.render('register', { title: 'registration' });
});

router.post('/register',async function (req, res) {
    var form = new multiparty.Form();
    await form.parse(req, async function (err, fields, files) {
        if (fields) {
            // TODO: проверить есть ли такой пользователь уже
            var login = fields.login[0];
            var firstName = '';
            if (!(typeof fields.firstName[0] === 'undefined')) {
                firstName = fields.firstName[0];
            }
            var lastName = '';
            if (!(typeof fields.firstName[0] === 'undefined')) {
                lastName = fields.lastName[0];
            }
            var password = fields.password[0];
            var user = new User(
                {
                    login: login,
                    firstName: firstName,
                    lastName: lastName,
                    password: password
                }
            );
            await user.save(function (err) {
                if (err) console.log(err);
            });
        }
    });
    res.send('done');
});

/*  Set res.locals.needToHide = true 
 *  if you want to hide page from users without token(nonauthorized users)*/
router.get('/user_info', function (req, res, next) {
    res.locals.needToHide = true; next();},
    userLoad.verifyToken,
    function (req, res) {
    var data = req.data;
    data.title = 'User profile';
    res.render('user_info', { currUser: req.data.user});
});

module.exports = router;
