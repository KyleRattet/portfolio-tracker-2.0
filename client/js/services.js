app.factory('httpFactory', ['$http', function($http) {

  var obj = {};

  //1. get request
  obj.get = function(url) {
    return $http.get(url);
  };

  //2. post request
  obj.post = function(url, payload){
    return $http.post(url, payload);
  };

  // //3. Delete request
  obj.delete = function (url) {
    return $http.delete(url);
  };

  // //4. Put request
  obj.put = function(url, payload) {
    return $http.put(url, payload);
  };

  return obj;



}]);

//auth
app.factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in controllers
    return ({
      // isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });
}]);

function getUserStatus() {
  if(user) {
    return true;
  } else {
    return false;
  }
}

// function getUserStatus() {
//   return user;
// }

function login(username, password) {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  $http.post('/user/login', {username: username, password: password})
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        user = true;
        deferred.resolve();
      } else {
        user = false;
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}

function logout() {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a get request to the server
  $http.get('/user/logout')
    // handle success
    .success(function (data) {
      user = false;
      deferred.resolve();
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}

function register(username, password) {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  $http.post('/user/register', {username: username, password: password})
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        deferred.resolve();
      } else {
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}
// angular.module('myApp').factory('AuthService',
//   ['$q', '$timeout', '$http',
//   function ($q, $timeout, $http) {

//     // create user variable
//     var user = null;

//     // return available functions for use in controllers
//     return ({
//       isLoggedIn: isLoggedIn,
//       getUserStatus: getUserStatus,
//       login: login,
//       logout: logout,
//       register: register
//     });

//     function isLoggedIn() {
//         if(user) {
//           return true;
//         } else {
//           return false;
//         }
//     }

//     function getUserStatus() {
//       return user;
//     }

//     function login(username, password) {

//       // create a new instance of deferred
//       var deferred = $q.defer();

//       // send a post request to the server
//       $http.post('/user/login', {username: username, password: password})
//         // handle success
//         .success(function (data, status) {
//           if(status === 200 && data.status){
//             user = true;
//             deferred.resolve();
//           } else {
//             user = false;
//             deferred.reject();
//           }
//         })
//         // handle error
//         .error(function (data) {
//           user = false;
//           deferred.reject();
//         });

//       // return promise object
//       return deferred.promise;

//     }

//     function logout() {

//       // create a new instance of deferred
//       var deferred = $q.defer();

//       // send a get request to the server
//       $http.get('/user/logout')
//         // handle success
//         .success(function (data) {
//           user = false;
//           deferred.resolve();
//         })
//         // handle error
//         .error(function (data) {
//           user = false;
//           deferred.reject();
//         });

//       // return promise object
//       return deferred.promise;

//     }

//     function register(username, password) {

//       // create a new instance of deferred
//       var deferred = $q.defer();

//       // send a post request to the server
//       $http.post('/user/register', {username: username, password: password})
//         // handle success
//         .success(function (data, status) {
//           if(status === 200 && data.status){
//             deferred.resolve();
//           } else {
//             deferred.reject();
//           }
//         })
//         // handle error
//         .error(function (data) {
//           deferred.reject();
//         });

//       // return promise object
//       return deferred.promise;

//     }

// }]);
