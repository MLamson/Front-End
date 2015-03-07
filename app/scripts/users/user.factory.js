;(function (){
  
  'use strict';

  angular.module('User')

  .factory('UserFactory', ['$http', 'PARSE', '$cookieStore', '$location',

    function ($http, PARSE, $cookieStore, $location) {
    
      // Get Current User
      var currentUser = function () {
        return $cookieStore.get('currentUser');
      };

      // Check User Status
      var checkLoginStatus = function () {
        var user = currentUser();
        if (user) {
          PARSE.CONFIG.headers['X-PARSE-Session-Token'] = user.sessionToken;
          console.log('in checkLoginStatus');
        }
      };

      // Add a new User
      var addUser = function (userObj) {
        $http.post(PARSE.URL + 'users', userObj, PARSE.CONFIG)
          .then( function (res) {
            console.log(res);
          }
        );
      };

      // Log in a User
      var loginUser = function (userObj) {

        $http({
          method: 'GET',
          url: PARSE.URL + 'login',
          headers: PARSE.CONFIG.headers,
          params: userObj
        }).then (function (res) {
          console.log(res);
          $cookieStore.put('currentUser', res.data);
          $location.path('/');
        });
        
      };

      // Logout Method
      var logoutUser = function () {
        $cookieStore.remove('currentUser');
        $location.path('/login');
        console.log('in logoutUser factory');

      }
  
      return {
        register : addUser, 
        login : loginUser,
        user : currentUser,
        status : checkLoginStatus,
        logout : logoutUser,
      };

    }

  ]);

}());