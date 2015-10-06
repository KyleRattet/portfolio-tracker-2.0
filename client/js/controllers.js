app.controller('MainController', ['$scope', '$http', 'httpFactory', function($scope, $http, httpFactory) {

  $scope.portfolio = [];

     //get stock from portfolio, api call to my database
   getStocks = function (url) {
    httpFactory.get(url)
    .then(function(response){
      $scope.portfolio = response.data;
      console.log($scope.portfolio);
    });
   };

   getStocks('api/v1/stocks');

    //add to portfolio
  function addLast () {
    for (var i = 0; i < $scope.portfolio.length; i++) {
      $scope.portfolio[i].last = "testing";
    };
    return $scope.portfolio;
  }

  addLast();
  console.log($scope.portfolio);



  $scope.totalExposure = function() {
    var total = 0;
    for (var i = 0; i < $scope.portfolio.length; i++) {
      var stock = $scope.portfolio[i];
      total += (stock.costBasis * stock.shares);
    }
    return total;
  };



  //api call to get stock quote
  $scope.getQuote = function (symbol) {
    console.log($scope.symbol);
    var stock = $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+symbol+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
    .then(function(data) {
      console.log(data);
      $scope.stockData = data.data.query.results.quote;
    });

   };


   //add stock
  // $scope.addStock = function () {
  //   $scope.stock.last = "last test";
  //   $scope.stock.date = new Date();
  //   var payload = $scope.stock;
  //   console.log(payload, "payload");
  //   httpFactory.post('api/v1/stocks', payload)
  //   .then(function(response) {
  //     $scope.portfolio.push(response.data);
  //     console.log($scope.portfolio);
  //     getStocks('api/v1/stocks');
  //   });
  // };





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

  $scope.lastPrice = [];

  $scope.updateLast = function (symbol) {
    var stock = $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+symbol+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
    .then(function(data) {
      console.log(data);
      $scope.last = data.data.query.results.quote.LastTradePriceOnly;
      $scope.portfolio.push($scope.last);
    });
  };



}]);
