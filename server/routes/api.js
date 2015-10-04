var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var Stock = require('../models/stocks.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//ROUTE 1 GET ALL Stocks
router.get('/stocks', function(req, res, next) {
  Stock.findQ()
    .then(function (result) { res.json(result) })
    .catch(function (err) {res.send(err) })
    .done();
});

//ROUTE 2 GET ONE Stock
router.get('/stock/:id', function(req, res, next) {
  Stock.findByIdQ(req.params.id)
  .then(function (result) { res.json(result) })
  .catch(function (err) {res.send(err) })
  .done();
});

module.exports = router;
