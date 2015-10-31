// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var Portfolio = new Schema ({
//   value: Number,
//   date: Number
// });


// module.exports = mongoose.model('portfolios', Portfolio);

// mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/portfolios");


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Stock = require('./stocks.js');


var Portfolio = new Schema ({
    stocks: [{type: Schema.Types.ObjectId, ref: 'stocks'}],
    value: Number,
    date: Number
});

module.exports = mongoose.model('portfolios', Portfolio);

// mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/portfolios");
