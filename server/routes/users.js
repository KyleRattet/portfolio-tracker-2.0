var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose-q')(require('mongoose'));
var passport = require('passport');
var passportLocal = require('../auth/local');

var User = require('../models/user');
var Stock = require('../models/stocks');
var Portfolio = require('../models/portfolios');

//get all users
router.get('/', function(req, res, next){
  User.findQ({})
  .then(function(data){
    res.json(data);
    console.log("get all users test")
  })
  .catch(function(err){
    res.send(err);
  });
});

//get single user information
router.get('/:id', function(req, res, next){
  User.findByIdQ(req.user_id)
  .then(function(result){
    res.json(result);
  })
  .catch(function(err){
    res.send(err);
  })
  .done();
});

//get all portfolio from a single user
router.get('/:userid/portfolios', function(req, res, next){
 User.findById(req.params.userid)
  .populate('portfolios')
  .exec(function(err, user){
    if(err){
      console.log(err);
    }
    else{
      res.json(user.portfolios);
    }
  });
});

//get all stocks from a single user
router.get('/:userid/stocks', function(req, res, next){
  User.findById(req.params.userid)
  .populate('stocks')
  .exec(function(err, user){
    if(err){
      res.send(err);
    } else {
      res.json(user.stocks);
    }
  });
});

//get all stocks and portfolios for a single user
router.get('/:userid/all', function(req, res, next){
  User.findById(req.params.userid)
  .populate('stocks')
  .populate('portfolios')
  .exec(function(err, user){
    if(err){
      res.send(err);
    } else {
      res.json(user);
    }
  });
});

//post to add single portfolio to a user
router.post('/:userid/portfolios', function(req, res, next){
  var newPortfolio = new Portfolio(req.body);
  newPortfolio.save();

  var id = req.params.userid;
  var update = {$push : { portfolios : newPortfolio } };
  var options = {new :true };
  User.findByIdAndUpdateQ(id, update, options)
  .then(function(result){
    res.json(result);
  })
  .catch(function(err){
    res.send({'ERROR' : err});
  })
  .done();
});

//post to add single stock to a user
router.post('/:userid/stocks', function(req, res,next){
  var newStock = new Stock(req.body);
  newStock.save();

  var id = req.params.userid;
  console.log(id, "current user id")
  var update = {$push : {stocks : newStock}};
  var options = {new : true};

  User.findByIdAndUpdateQ(id, update, options)
  .then(function(result){
    res.json(result);
  })
  .catch(function(err){
    res.send(err);
  })
  .done();

});





module.exports = router;
