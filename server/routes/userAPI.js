var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportLocal = require('../auth/local');
var User = require('../models/user.js');



router.post('/register', function(req, res) {
  console.log('hi')
  User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
    console.log(err, "err log");
    if (err) {
      console.log(req.body);
      console.log(res, "RES");
      return res.status(500).json({err: err});
    }
    passport.authenticate('local')(req, res, function () {
      console.log(res, "RES");
      console.log(req.body);
      return res.status(200).json({status: 'Registration successful!'});
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {

    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});

module.exports = router;
