var app = angular.module('myApp', ['ngRoute','nvd3ChartDirectives']);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      // .when('/trade', {
      //   templateUrl: '../views/tradeTicket.html',
      //   controller: 'MainController'
      // })
      .when('/portfolio', {
        templateUrl: '../views/portfolio.html',
        controller: 'MainController'
      });
}]);
