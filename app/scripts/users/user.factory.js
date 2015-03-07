;(function (){
  
  'use strict';

  angular.module('User')

  .factory('UserFactory', ['$http', 'PARSE', '$cookieStore', '$location',

    function ($http, PARSE, $cookieStore, $location) {
    
      // Get Current User
      var currentUser = function () {
        return $cookieStore.get('authentication_token');
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
        $http.post(PARSE.URL + 'users', {user: userObj})
          .then( function (res) {
            console.log(res);

          }
        );
      };

      // Log in a User
      var loginUser = function (userObj) {

        $http.post(PARSE.URL + 'users/sign_in', {user: userObj})
          .success (function (res) {
            console.log(res);
          console.log(res.user.authentication_token);
          $cookieStore.put('authentication_token', res.user.authentication_token);

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