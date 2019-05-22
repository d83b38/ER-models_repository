var User = require('../models/user');
var multiparty = require('multiparty');


exports.userInfo_get = function (req, res) {
    //var username = req.body.username;
    //var password = req.body.password;
    res.render('user_info', { title: 'User profile', user: {username: 'User', roles: ['role1','role2']} });
};


exports.userLogin_get = function (req, res) {
    //var username = req.body.username;
    //var password = req.body.password;
    res.render('login', { title: 'login' });
};


exports.userLogin_post = function (req, res) {
    //req.user = res.locals.user = null;
    var form = new multiparty.Form();

    form.parse(req, function(err,fields,files) {
        if (fields) {
            var login = fields.login[0];
            var password = fields.password[0];
        }
    })


    //User.authorize(username, password, function(err,user) {
    //    if (err) {
    //        //шаманство с ошибками
    //    }
    //})
    //сессия?
    res.send('NOT IMPLEMENTED');
};

exports.userLogout_post = function (req, res) {
    //var username = req.body.username;
    //var password = req.body.password;
    res.send('NOT IMPLEMENTED');
};

exports.userRegister_get = function (req, res) {
    //var username = req.body.username;
    //var password = req.body.password;
    res.render('register_form', { title: 'registration' });
};

exports.userRegister_post = function (req, res) {

    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
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
            user.save(function (err) {
                if (err) console.log(err);
            });
        }
    });
    res.send('done');
    //var username = req.body.username;
    //var password = req.body.password;

    //var user = new User(
    //    {
    //        username: username,
    //        password: password
    //    }
    //);
    //user.save(function (err) {
    //    if (err) console.log('Error on save!');
    //});
    //return res.end('done');
};



