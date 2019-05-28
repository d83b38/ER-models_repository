'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

async function checkLogin(login, password) {
    var crypPass = crypto.createHash('md5').update(password).digest('hex');
    try {
        var foundUser = await User.find({ login: login, hashedPassword: crypPass });
        //console.log(foundUser.length === 1);
        if (foundUser.length === 1) {
            return {
                isAuth: true,
                user: {
                    login: foundUser[0].login,
                    id: foundUser[0]._id,
                    firstName: foundUser[0].firstName,
                    lastName: foundUser[0].lastName
                    // postsID: foundUser[0].posts,
                }
            };
        }
        else
            return {
                isAuth: false,
                user: null
            };
    } catch (e) {
        console.log('something with find wrong');
        return {
            isAuth: false,
            user: null
        };
    }
}   

function getToken(user, secret) {
    var token = jwt.sign(user, secret, { expiresIn: 10000});

    return token;
}

function verifyToken(req, res, next) {
    var token = req.cookies['authToken'];
    if (!(typeof token === 'undefined')) {
        try {
            var decoded = jwt.verify(token, req.app.get('secret'));
            next();
        } catch (e) {
            res.send('Token expired / No token :(');
            //res.sendStatus(403);
        }   
    }
    else {
        if (res.locals.needToHide === true) {
            res.send('No token :(');
            //res.sendStatus(403);
        }
        else {
            next();
        }
    }
}

function getUser(token, secret) {
    try {
        var user = jwt.verify(token, secret);
        return user;
    } catch (e) {
        console.log(e);
        return null;
    }
}

router.all('*', function (req, res, next) {
    var data = {};
    console.log('loading ...' );
    var token = req.cookies['authToken'];
    //console.log(token);
    if (token) {
        data.token = token;
        data.user = getUser(token, req.app.get('secret'));
    }
    req.data = data;
    next(); 
});

module.exports = {
    router: router,
    checkLogin: checkLogin,
    getToken: getToken,
    getUser: getUser,
    verifyToken: verifyToken
};