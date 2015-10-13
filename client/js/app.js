var app = angular.module('myApp', ['ngRoute','nvd3ChartDirectives']);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/portfolio', {
        templateUrl: '../views/portfolio.html',
        controller: 'PortfolioController',
        access: {restricted: true}
      })
      .when('/research', {
        templateUrl: '../views/research.html',
        controller: 'MainController',
        access: {restricted: true}
      })
      //update these correctly
      .when('/homepage', {
        templateUrl: '../views/home.html',
        controller: 'MainController',
        access: {restricted: false}
      })
      .when('/', {
        templateUrl: 'partials/home.html'})
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginController',
        access: {restricted: false}
      })
      .when('/logout', {
        controller: 'logoutController',
        access: {restricted: false}
      })
      .when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'registerController',
        access: {restricted: false}
      })
      .when('/one', {
        template: '<h1>This is page one!</h1>',
        access: {restricted: true}})
      .when('/two', {
        template: '<h1>This is page two!</h1>',
        access: {restricted: false}
      })
      .otherwise({redirectTo: '/'});


}]);

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {

    if (next.access.restricted && !AuthService.getUserStatus()) {
      $location.path('/login');
    }
  });
});


