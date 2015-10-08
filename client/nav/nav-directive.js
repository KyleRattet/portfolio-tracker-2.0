angular.module('directives')
  .directive('myNavBar', [function(){
    return {
      restrict: 'E',
      templateUrl: 'nav/nav.html',
    };
  }]);


// app.directive('myNavBar', function () {
//   return {
//     restrict: 'E',
//     templateUrl: 'templates/nav.html',
//   };
// });
