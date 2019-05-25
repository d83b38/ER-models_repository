﻿'use strict';
var debug = require('debug');
var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// TODO: вынести подключение к бд в отдельный модуль?
//подключение  ODM к базе данных
var mongoose = require('mongoose');
var mongoDBURL = 'mongodb://localhost/ER-models_repository';
mongoose.connect(mongoDBURL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));  
mongoose.Promise = global.Promise;
var db_mon = mongoose.connection;
db_mon.on('error', console.error.bind(console, 'MongoDB connection error:'));
var MongoClient = require('mongodb').MongoClient;

var routes = require('./routes/index');
var users = require('./routes/users');
var catalog  = require('./routes/catalog');
var wiki = require('./routes/wiki.js');
var userLoad = require('./routes/userLoad.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('secret', 'strochkaSekreta');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userLoad.router);
app.use('/', routes);
app.use('/users', users);
app.use('/catalog', catalog);
app.use('/wiki', wiki);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

