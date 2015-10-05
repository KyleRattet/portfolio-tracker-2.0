app.controller('MainController', ['$scope', '$http', 'httpFactory', function($scope, $http, httpFactory) {

  $scope.portfolio = [];

  //api call to get stock quote
  $scope.getQuote = function () {
    console.log($scope.symbol);
    var stock = $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+$scope.symbol+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
    .then(function(data) {
      console.log(data);
      $scope.stockData = data.data.query.results.quote;
    });

   };

   //get stock from portfolio, api call to my database
   getStocks = function (url) {
    httpFactory.get(url)
    .then(function(response){
      $scope.portfolio = response.data;
    });
   };

   getStocks('api/v1/stocks');
   console.log(getStocks('api/v1/stocks'));
   //add stock
  $scope.addStock = function () {
    $scope.stock.date = new Date();
    var payload = $scope.stock;
    console.log(payload);
    httpFactory.post('api/v1/stocks', payload)
    .then(function(response) {
      $scope.portfolio.push(response.data);
      console.log($scope.portfolio);
      getStocks('api/v1/stocks');
    });
  };



}]);
