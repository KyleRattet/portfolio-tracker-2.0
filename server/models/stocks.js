var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema ({
  name: String,
  ticker: String,
  side: String,
  shares: Number,
  costBasis: Number,
  date: String,
  last: Number
});


module.exports = mongoose.model('stocks', Stock);


// for heroku later
// mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/stocks");
