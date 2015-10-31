app.controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {
      // console.log("logout button");

      AuthService.getUserStatus();
           // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
          $scope.userName = "";
          console.log("logout button")
        });

    };

}]);
