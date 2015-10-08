var app = angular.module('myApp', ['ngRoute','nvd3ChartDirectives']);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/portfolio', {
        templateUrl: '../views/portfolio.html',
        controller: 'PortfolioController'
      })
      .when('/research', {
        templateUrl: '../views/research.html',
        controller: 'MainController'
      })
      .when('/', {
        templateUrl: '../views/home.html',
        controller: 'MainController'
      });
}]);

