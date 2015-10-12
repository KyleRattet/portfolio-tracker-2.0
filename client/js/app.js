var app = angular.module('myApp', ['ngRoute','nvd3ChartDirectives', 'ngAnimate']);


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
        controller: 'MainController',
        access: {restricted: false}
      })
      .when('/login', {
      templateUrl: '../partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
    .when('/one', {
      template: '<h1>This is page one!</h1>',
      access: {restricted: true}
    })
    .when('/two', {
      template: '<h1>This is page two!</h1>',
      access: {restricted: false}
    })
    .otherwise({redirectTo: '/'});
}]);

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && AuthService.getUserStatus() === false) {
      $location.path('/login');
    }
  });
});

