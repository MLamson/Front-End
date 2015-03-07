;(function (){
  
  'use strict';

  angular.module('User', ['ngRoute', 'ngCookies'])

  .controller('UserCtrl', ['$scope', 'UserFactory', '$location', 

    function ($scope, UserFactory, $location) {

      // If Currently Logged in - Leave this controller
      var user = UserFactory.user();
      if (user) {
        return $location.path('/');
      }

      // Add a new user
      $scope.registerUser = function (userObj) {
        UserFactory.register(userObj);
        console.log('registerusercontroller', userObj);
        $location.path('/')
      };

      // Login Method
      $scope.loginUser = function (userObj) {
        UserFactory.login(userObj);
      };
    
    }

  ]);

}());