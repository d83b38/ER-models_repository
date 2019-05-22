'use strict';
var express = require('express');
var router = express.Router();

router.all('*', function (req, res, next) {
    console.log('loading user...');
    next(); 
});
module.exports = {
    router: router

}