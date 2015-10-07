app.controller('MainController', ['$scope', '$http', 'httpFactory', function($scope, $http, httpFactory) {

  $scope.portfolio = [];

   //get stock from portfolio, api call to my database
  getStocks = function (url) {
    httpFactory.get(url)
    .then(function(response){
      $scope.portfolio = response.data;
    });
  };

  getStocks('api/v1/stocks');


  $scope.initialValue = function() {
    var total = 0;
    for (var i = 0; i < $scope.portfolio.length; i++) {
      var stock = $scope.portfolio[i];
      total += (stock.costBasis * stock.shares);
    }
    return total;
  };

  $scope.portfolioMarketValue = function() {
    var total = 0;
    for (var i = 0; i < $scope.portfolio.length; i++) {
      var stock = $scope.portfolio[i];
      total += (stock.last * stock.shares);
    }
    return total;
  };

  //api call to get stock quote
  $scope.getQuote = function (symbol) {
    var stock = $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+symbol+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
    .then(function(data) {
      $scope.stockData = data.data.query.results.quote;
    });

  };

  $scope.editStock = function (id) {
    var stockURL = "api/v1/stock/"+ id;
    httpFactory.get(stockURL)
    .then(function(response) {
      $scope.stock = response.data;
    });
  };

  $scope.updateStock = function (id, updatedStock) {
    var update = updatedStock;
    var stockURL = "api/v1/stock/"+ id;
    httpFactory.put(stockURL, update)
    .then(function(response){
      getStocks('api/v1/stocks');
      $scope.stock = {};
    });
  };

  $scope.deleteStock = function (id) {
    stockURL = "api/v1/stock/"+ id;
    httpFactory.delete(stockURL)
    .then(function(response) {
      getStocks('api/v1/stocks');
    });
  };

  $scope.updateLast = function () {
    $scope.portfolio.forEach(function(obj){
      var symbol = obj.ticker;
      var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+symbol+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
      $http.get(url).then(function(data) {
        var lastTradePrice = data.data.query.results.quote.LastTradePriceOnly;
        obj.last = lastTradePrice;
        $scope.updateStock(obj._id, obj);
      });
    });

    // console.log($scope.portfolio);

    // for (var i = 0; i < $scope.portfolio.length; i++) {
    //   //get request
    //   var symbol = $scope.portfolio[i].ticker;
    //   //get request
    //   $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+symbol+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
    //   .then(function(data) {
    //     var lastTradePrice = data.data.query.results.quote.LastTradePriceOnly;
    //     console.log(lastTradePrice, "last trade price");
    //     newPrices.push(lastTradePrice)
    //   });
    //   console.log(newPrices)
    //   // put request to update objects in portfolio
    //   // var stockURL = "api/v1/stock/"+ $scope.portfolio[i].id;
    //   // var update = {
    //   //       ticker: $scope.portfolio[i].ticker,
    //   //       side: $scope.portfolio[i].side,
    //   //       shares: $scope.portfolio[i].shares,
    //   //       last: lastTradePrice,
    //   //       costBasis: $scope.portfolio[i].costBasis,
    //   //       date: $scope.portfolio[i].date
    //   //       } ;
    //   // httpFactory.put(stockURL, update)
    //   // .then(function(response){
    //   //   getStocks('api/v1/stocks');
    //   //   // $scope.stock = {};
    //   // });


    // }

    // return $scope.portfolio;

    // getStocks('api/v1/stocks');
  };




  $scope.addStock = function (symbol) {

    var newStock = {
      ticker: $scope.stockData.Symbol,
      side: $scope.side,
      shares: $scope.shares,
      last: $scope.stockData.LastTradePriceOnly,
      costBasis: $scope.stockData.LastTradePriceOnly,
      date: new Date()
    };
    httpFactory.post('api/v1/stocks', newStock)
    .then(function(response) {
      $scope.portfolio.push(response.data);
      getStocks('api/v1/stocks');

    });

  };

  $scope.xAxisTickFormatFunction = function(){
  return function(date){
    return d3.time.format('%x')(new Date(date));
  };
};

  //epoch time
  function getTime () {
    var time = Math.round(new Date().getTime());
    return time;
  }


  $scope.exampleData = [
                {
                    "key": "Series 1",
                    "values": [ [ 1443666958000 , 0] , [ 1443753358000 , 6.3382185140371] , [ 1443839758000 , 9.9507873460847] , [  1443926158000 , 11.569146943813] , [ 1444186007379 , 15.4767332317425]]
                }];



}]);
