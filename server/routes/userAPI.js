var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportLocal = require('../auth/local');
var User = require('../models/user.js');

var Portfolio = require('../models/portfolios.js');
var Stock = require('../models/stocks.js');



router.post('/register', function(req, res) {

  User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
    console.log(err, "err log");
    if (err) {
      return res.status(500).json({err: err});
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'});
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      req.session.user = user;
      res.status(200).json({
        status: 'Login successful!',
        user: user

      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});


router.get('/userinfo', function(req, res, next){
 User.findById(req.session.user._id, function(err, user){
 })
  .populate('stocks')
  .populate('portfolios')
  .exec(function(err, user){
    if(err){
      res.json(err);
    }
    else{
      res.json(user);
    }
  });
});

module.exports = router;
