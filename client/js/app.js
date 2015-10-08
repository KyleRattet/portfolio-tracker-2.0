var app = angular.module('myApp', ['ngRoute','nvd3ChartDirectives']);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/portfolio', {
        templateUrl: '../views/portfolio.html',
        controller: 'MainController'
      });
}]);

app.directive('myNavBar', function () {
  return {
    restrict: 'E',
    templateUrl: 'nav/nav.html',
  };
});
