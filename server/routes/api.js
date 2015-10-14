var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var Stock = require('../models/stocks.js');

//auth
var User = require('../models/user.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//ROUTE 1 GET ALL Stocks
router.get('/stocks', function (req, res, next) {
  Stock.findQ()
    .then(function (result) { res.json(result) })
    .catch(function (err) {res.send(err) })
    .done();
});

//ROUTE 2 GET ONE Stock
router.get('/stock/:id', function (req, res, next) {
  Stock.findByIdQ(req.params.id)
  .then(function (result) { res.json(result) })
  .catch(function (err) {res.send(err) })
  .done();
});

//ROUTE 3 POST ONE STOCK
router.post('/stocks', function (req, res, next) {
  newStock = new Stock ({
    name: req.body.name,
    ticker: req.body.ticker,
    side: req.body.side,
    shares: req.body.shares,
    costBasis: req.body.costBasis,
    last: req.body.last,
    date: req.body.date
  });
  newStock.saveQ()
    .then(function (result) {
      res.json({"SUCCESS":result});
      })
    .catch(function (err) {
      res.send(err);
      })
    .done();
});

//ROUTE 4 PUT to Update
router.put('/stock/:id', function (req, res ,next){
  console.log(req.body.id);
  var update = {
    name: req.body.name,
    ticker: req.body.ticker,
    side: req.body.side,
    shares: req.body.shares,
    costBasis: req.body.costBasis,
    last: req.body.last,
    date: req.body.date
  };
  var options = {new:true};
  Stock.findByIdAndUpdateQ(req.params.id, update, options)
  .then(function (result) {
    res.json({"UPDATED": result});
    })
  .catch(function (err) {
    res.send(err);
  });
});

//ROUTE 5 DELETE
router.delete('/stock/:id', function(req, res, next) {
  Stock.findByIdAndRemoveQ(req.params.id)
  .then(function (result) {
                        res.json({"REMOVED" : result});
                          })
   .catch(function (err) {res.send(err) })
   .done();
});


// ///Auth Section///
// router.post('/register', function(req, res) {
//   User.register(new User({ username: req.body.username }), req.body.password, function(err, account) {
//     if (err) {
//       return res.status(500).json({err: err});
//     }
//     passport.authenticate('local')(req, res, function () {
//       return res.status(200).json({status: 'Registration successful!'});
//     });
//   });
// });

// router.post('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) {
//       return res.status(500).json({err: err});
//     }
//     if (!user) {
//       return res.status(401).json({err: info});
//     }
//     req.logIn(user, function(err) {
//       if (err) {
//         return res.status(500).json({err: 'Could not log in user'});
//       }
//       res.status(200).json({status: 'Login successful!'});
//     });
//   })(req, res, next);
// });

// router.get('/logout', function(req, res) {
//   req.logout();
//   res.status(200).json({status: 'Bye!'});
// });


module.exports = router;











