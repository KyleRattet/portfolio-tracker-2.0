// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var swig = require('swig');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');


// *** routes *** //
// var routes = require('./routes/index.js');
var userRoutes = require('./routes/users.js');
var apiRoutes = require('./routes/api.js');
var chartRoutes = require('./routes/chart.js');

var user = require('./routes/userAPI.js');
// *** express instance *** //
var app = express();


// *** config file *** //
var config = require('./_config');

// *** mongoose *** ///
mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});


app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


// *** main routes *** //
app.use('/users/', userRoutes);
app.use('/api/v1/', apiRoutes);
app.use('/chart/', chartRoutes);
//auth route
app.use('/auth', user);

app.use('/', function (req,res) {
  res.sendFile(path.join(__dirname, '../client/views/', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// updated development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({status: 'Error!'});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({status: 'Error!'});
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
