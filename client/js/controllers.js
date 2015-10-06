app.controller('MainController', ['$scope', '$http', 'httpFactory', function($scope, $http, httpFactory) {

  $scope.portfolio = [];

     //get stock from portfolio, api call to my database
   getStocks = function (url) {
    httpFactory.get(url)
    .then(function(response){
      $scope.portfolio = response.data;
      console.log($scope.portfolio);
      // for(i=0; i < response; i++){
      //   $scope.portfolio.push(getQuote(response[i])
      // }

    });
   };

   getStocks('api/v1/stocks');


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


   $scope.editStock = function (id) {
    console.log('testing edit');
    stockURL = "api/v1/stock/"+ id;
    httpFactory.get(stockURL)
    .then(function(response) {

      $scope.stock = response.data;
      console.log($scope.stock, "stock edit response");
    });
  };

  $scope.updateStock = function () {
     var update = $scope.stock;
    httpFactory.put(stockURL, update)
    .then(function(response){

      getStocks('api/v1/stocks');
      $scope.project = {};
    });
  };



  //   $scope.updateLast = function () {


  //   for (var i = 0; i < $scope.portfolio.length; i++) {
  //       var stock = $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+$scope.portfolio[i].ticker+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
  //   .then(function(data) {
  //     console.log(data);
  //     $scope.lastPrice[i] = data.data.query.results.quote.LastTradePriceOnly;
  //     console.log($scope.lastPrice[i], "scope last price");
  //     $scope.portfolio[0].last = $scope.lastPrice[i];
  //     console.log($scope.portfolio[0].last);
  //   });

  //   };
  // };



  $scope.addStock = function (symbol) {

    //  var stock = $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+symbol+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
    // .then(function(data) {
    //   console.log(data);
    //   $scope.last = data.data.query.results.quote.LastTradePriceOnly;
    // });

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





}]);
