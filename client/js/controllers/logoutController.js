
app.controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      AuthService.getUserStatus();
           // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
          $scope.userName = "";
        });

    };

}]);
