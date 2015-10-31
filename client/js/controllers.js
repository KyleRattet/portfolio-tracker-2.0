app.controller('MainController', ['$scope', '$http', 'httpFactory', 'AuthService' , function($scope, $http, httpFactory, AuthService) {

  function displayName () {
    if(AuthService.getUserStatus() === false) {
      $scope.userName = '';
    } else {
      $scope.welcome = true;
    }
  };



  $scope.portfolioDBValue = [];
  // $scope.userName = "";

  function getPortfolio () {
    $http.get('/users/' + $scope.userid + '/stocks')
      .catch(function(){
        $scope.gameError = "Error!";})
      .then(function(data){
        $scope.userPortfolio = data.data;
      });
  }

  function getUser () {
    $http.get('/auth/userinfo')
      .catch(function(){
        $scope.userError = "Error!";})
      .then(function(data){

        $scope.userName = data.data.username;
        console.log($scope.userName, "username scope")
        $scope.userid = data.data._id;
        $scope.portfolioDBValue = data.data;
        getPortfolio('/users/' + $scope.userid + '/stocks');
        displayName();
      });
  }

  getUser();

  console.log(AuthService.getUserStatus(),  "main controller");




  $scope.addStock = function (symbol) {
    var newStock = {
      ticker: $scope.stockData.Symbol,
      side: $scope.side,
      shares: $scope.shares,
      last: $scope.stockData.LastTradePriceOnly,
      costBasis: $scope.stockData.LastTradePriceOnly,
      date: new Date()
    };
    var id = $scope.userid;
    httpFactory.post('/users/' + id + '/stocks', newStock)
    .then(function(response) {
      $scope.userPortfolio.push(response.data);
    });
  };


  $scope.tradeForm = function () {
    $scope.trade = true;
  };

  $scope.getQuote = function (symbol) {
    $scope.quote = true;
    $scope.pulse = true;
    var stock = $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+symbol+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
    .then(function(data) {
      $scope.stockData = data.data.query.results.quote;
    });
  };

  $scope.getSPX = function (symbol) {
    var stock = $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+symbol+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
    .then(function(data) {
      $scope.indexSPX = data.data.query.results.quote;
    });
  };

  $scope.getSPX('^GSPC');

  $scope.getNDAQ = function (symbol) {
    var stock = $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+symbol+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
    .then(function(data) {
      $scope.indexNDAQ = data.data.query.results.quote;
    });
  };

  $scope.getNDAQ('^IXIC');

  $scope.getTNX = function (symbol) {
    var stock = $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+symbol+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
    .then(function(data) {
      $scope.indexTNX = data.data.query.results.quote;
    });
  };

  $scope.getTNX('^TNX');

  $scope.getOIL = function (symbol) {
    var stock = $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+symbol+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
    .then(function(data) {
      $scope.indexOIL = data.data.query.results.quote;
    });
  };

  $scope.getOIL('CLX15.NYM');

  $scope.getGold = function (symbol) {
    var stock = $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+symbol+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
    .then(function(data) {
      $scope.indexGold = data.data.query.results.quote;
    });
  };

  $scope.getGold('GCV15.CMX');

  $scope.getUSD = function (symbol) {
    var stock = $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+symbol+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=")
    .then(function(data) {
      $scope.indexUSD = data.data.query.results.quote;
    });
  };

  $scope.getUSD('DX-Y.NYB');


}]);

app.controller('PortfolioController', ['$scope', '$http', 'httpFactory' , function($scope, $http, httpFactory) {

   function displayName () {
    if(AuthService.getUserStatus() === false) {
      $scope.userName = '';
    } else {
      $scope.welcome = true;
    }
  };



  $scope.userPortfolio = [];
  $scope.portfolioDBValue = [];

  function getPortfolio () {
    $http.get('/users/' + $scope.userid + '/stocks')
      .catch(function(){
        $scope.userError = "Error!";})
      .then(function(data){
        $scope.userPortfolio = data.data;
      });
  }

  function getUserPortfolio () {
    $http.get('/users/' + $scope.userid + '/portfolios')
      .catch(function(){
        $scope.gameError = "Error!";})
      .then(function(data){
        $scope.portfolioDBValue = data.data;
      });
  }

  function getUser () {
    $http.get('/auth/userinfo')
      .catch(function(){
        $scope.error = "Error!";})
      .then(function(data){
        displayName();
        $scope.userid = data.data._id;
        getPortfolio('/users/' + $scope.userid + '/stocks');
        getUserPortfolio('/users/' + $scope.userid + '/portfolios');
        displayName();
      });
  }

  getUser();

   $scope.editStock = function (id) {
    $scope.edit = true;
    var stockURL = "api/v1/stock/"+ id;
    httpFactory.get(stockURL)
    .then(function(response) {
      $scope.stock = response.data;
    });
  };

  $scope.updateStock = function (id, updatedStock) {
    $scope.edit = false;
    var update = updatedStock;
    var stockURL = "api/v1/stock/"+ id;
    httpFactory.put(stockURL, update)
    .then(function(response){
      getPortfolio('/users/' + $scope.userid + '/stocks');
      $scope.stock = {};
    });
  };

  $scope.deleteStock = function (id) {
    console.log(id, "id");
    console.log(id, "delete firing");
    stockURL = "api/v1/stock/"+ id;
    httpFactory.delete(stockURL)
    .then(function(response) {
      getPortfolio('/users/' + $scope.userid + '/stocks');
    });
  };

  $scope.initialValue = function() {

    var total = 0;
    for (var i = 0; i < $scope.userPortfolio.length; i++) {
      var stock = $scope.userPortfolio[i];
      total += (stock.costBasis * stock.shares);
    }
    return total;
  };

  $scope.portfolioMarketValue = function() {

    var total = 0;
    for (var i = 0; i < $scope.userPortfolio.length; i++) {
      var stock = $scope.userPortfolio[i];
      total += (stock.last * stock.shares);
    }
    return total;
  };


  $scope.xAxisTickFormatFunction = function(){
  return function(date){
    return d3.time.format('%x')(new Date(date));
  };
};

  function getTime () {
    var time = Math.round(new Date().getTime());
    return time;
  }

  $scope.chartData =[];

  var valuesArray = [];

  $scope.updatePortfolio = function () {

    var newPortfolio = {
      value: $scope.portfolioMarketValue(),
      date: getTime(),
    };
    httpFactory.post('/users/' + $scope.userid + '/portfolios', newPortfolio)
    .then(function(response) {
      $scope.portfolioDBValue.push(response.data.portfolios);

      for(i=0; i < $scope.portfolioDBValue.length; i++){
        var new_array = [$scope.portfolioDBValue[i].date, $scope.portfolioDBValue[i].value];
          $scope.chartData.push(new_array);
      }
         $scope.portfolioData = [
                {
                    "key": "Portfolio Value",
                    "values": $scope.chartData
                }];

    });
  };

  $scope.updateLast = function () {

    $scope.userPortfolio.forEach(function(obj){
      var symbol = obj.ticker;
      var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+symbol+"%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
      $http.get(url).then(function(data) {
        var lastTradePrice = data.data.query.results.quote.LastTradePriceOnly;
        obj.last = lastTradePrice;
        $scope.updateStock(obj._id, obj);
        $scope.refresh = new Date();
      });
    });

  };

}]);

