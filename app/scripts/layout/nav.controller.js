;(function (){
  
  'use strict';

  angular.module('STM')

  .controller('NavCtrl', ['$scope', 'UserFactory', 

    function ($scope, UserFactory) {
    
      var user = UserFactory.user();

      if (user) {
        $scope.loggedin = true;
        $scope.user = user;
      } else {
        $scope.loggedin = false;
      }


      $scope.logout = function () {
        UserFactory.logout();
        console.log('in logout nav');
      };  


    }

  ])

}());