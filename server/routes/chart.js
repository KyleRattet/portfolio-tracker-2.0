var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var Portfolio = require('../models/portfolios.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//ROUTE 1 GET portfolio
router.get('/portfolio', function (req, res, next) {
  Portfolio.findQ()
    .then(function (result) { res.json(result) })
    .catch(function (err) {res.send(err) })
    .done();
});

//ROUTE 2 POST portflio
router.post('/portfolio', function (req, res, next) {
  newPortfolio = new Portfolio({
    value: req.body.value,
    date: req.body.date,
  });
  console.log(newPortfolio, "new portfolio");
  newPortfolio.saveQ()
    .then(function (result) {
      res.json({"SUCCESS":result});
      })
    .catch(function (err) {
      res.send(err);
      })
    .done();
});






module.exports = router;
