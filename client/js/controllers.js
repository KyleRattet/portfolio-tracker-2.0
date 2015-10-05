app.controller('MainController', ['$scope', '$http', function($scope, $http) {

  $scope.test = "testing controller";

  $scope.getStock = function () {
    console.log($scope.symbol);
    var stock = $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+$scope.symbol+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
    .then(function(data) {
      console.log(data);
      $scope.stockData = data.data.query.results.quote;
    });

   };

}]);
