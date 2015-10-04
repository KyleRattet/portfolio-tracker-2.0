process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../server/app');
var Stock = require('../server/models/stocks');

var should = chai.should();
chai.use(chaiHttp);


//write tests

describe('Projects', function() {

//SETUP HOOKS TO CREATE PURE TESTING ENVIRONMENT
  Stock.collection.drop();

  beforeEach(function(done){
    var newStock = new Stock({
      name: "Apple Inc.",
      ticker: 'AAPL',
      side: 'buy',
      shares: 100,
      costBasis: 110.00,
      date: "October 3rd, 2015"
    });
    newStock.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Stock.collection.drop();
    done();
  });

//1. GET ALL Stocks TEST
  it('should list all stocks on /stocks GET request', function(done){
    chai.request(server)
    .get('/api/v1/stocks')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('ticker');
      res.body[0].should.have.property('side');
      res.body[0].should.have.property('shares');
      res.body[0].should.have.property('costBasis');
      res.body[0].name.should.equal('Apple Inc.');
      res.body[0].ticker.should.equal('AAPL');
      res.body[0].costBasis.should.equal(110);
      done();
    });
  });

//2. GET ONE STOCK Test
  it('should list one stock on /stock/<id> GET', function(done) {
    var newStock = new Stock ({
      name: "Google Inc.",
      ticker: 'GOOGL',
      side: 'sell',
      shares: 100,
      costBasis: 660.00,
      date: "October 3rd, 2015"
    });
    newStock.save(function(err, data) {
      chai.request(server)
        .get('/api/v1/stock/' + data.id)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('ticker');
          res.body.should.have.property('side');
          res.body.should.have.property('shares');
          res.body.should.have.property('costBasis');
          res.body.should.have.property('date');
          res.body.name.should.equal('Google Inc.');
          res.body.ticker.should.equal('GOOGL');
          res.body.side.should.equal('sell');
          res.body.costBasis.should.equal(660);
          done();
        });
    });
  });

//3. POST Test
  it('should add a SINGLE stock on /stocks POST', function(done) {
  chai.request(server)
    .post('/api/v1/stocks')
    .send({'name': 'Amazon Inc.', 'ticker': 'AMZN', 'side' : 'buy', 'shares' : 100 })
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS[0].should.be.a('object');
      res.body.SUCCESS[0].should.have.property('name');
      res.body.SUCCESS[0].should.have.property('ticker');
      res.body.SUCCESS[0].should.have.property('side');
      res.body.SUCCESS[0].should.have.property('_id');
      res.body.SUCCESS[0].name.should.equal('Amazon Inc.');
      res.body.SUCCESS[0].ticker.should.equal('AMZN');
      res.body.SUCCESS[0].side.should.equal('buy');
      done();
    });
  });

//4. PUT Test
  it("should update a single stock on /stock PUT", function(done){
  chai.request(server)
    .get('/api/v1/stocks')
    .end(function(err, res){
      chai.request(server)
        .put('/api/v1/stock/'+res.body[0]._id)
        .send({
          'name': 'Google Inc.',
          'ticker': "GOOGL",
          'side': 'sell',
          'shares': 200,
          'costBasis': 670,
          'date': "October 3rd, 2015"
          })
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('UPDATED');
          response.body.UPDATED.should.be.a('object');
          response.body.UPDATED.should.have.property('name');
          response.body.UPDATED.should.have.property('_id');
          response.body.UPDATED.name.should.equal('Google Inc.');
          response.body.UPDATED.shares.should.equal(200);
          response.body.UPDATED.costBasis.should.equal(670);
          done();
      });
    });
  });

});
