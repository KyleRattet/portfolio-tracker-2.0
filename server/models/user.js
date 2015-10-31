// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');
// var Portfolio = require('../models/portfolio.js');

// var User = new Schema({
//   username: String,
//   password: String,
//   // portfolio: [{type: Schema.Types.ObjectId, ref: 'porfolios'}]
// });

// User.plugin(passportLocalMongoose);

// module.exports = mongoose.model('users', User);

// mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/users");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Stock = require('./stocks.js');
var passportLocalMongoose = require('passport-local-mongoose');
var Portfolio = require('./portfolios.js');

var User = new Schema({
  username: {
    type: String,
    required: true,
    index: {unique : true}
    },
    password : String,
    stocks : [{ type : Schema.Types.ObjectId, ref : 'stocks'}],
    portfolios : [{ type : Schema.Types.ObjectId, ref : 'portfolios'}]
  }
);

// var User = new Schema({
//   username: String,
//   password: String
//   // portfolio: [{type: Schema.Types.ObjectId, ref: 'porfolios'}]
// });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/users");
