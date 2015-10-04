var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var Stock = require('../models/stocks.js');

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

//ROUTE 5 DELETE
module.exports = router;
