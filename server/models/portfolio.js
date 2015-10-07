var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Portfolio = new Schema ({
  value: Number,
  date: Number
});


module.exports = mongoose.model('portfolios', Portfolio);
