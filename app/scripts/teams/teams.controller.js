;(function (){
  
  'use strict';

  angular.module('STM')

  .controller('TeamCtrl', ['$scope', '$cacheFactory',  'TeamsFactory',

    function ($scope, $cacheFactory, TeamsFactory) {

      var cache = $cacheFactory.get('$http');

      $scope.teams = [];

      // TeamsFactory.get().success( function (response) {
      //   $scope.teams = response.results;
      // });
    
      $scope.addTeam = function (teamObj) {
        $scope.team = {};
        TeamsFactory.add(teamObj).success( function (results) {
          // teamObj.objectId = results.objectId;
          // $scope.teams.push(teamObj);
          // cache.remove('https://api.parse.com/1/classes/Lists');
        });
      };

      $scope.deleteTeam = function (id, index) {
        TeamsFactory.del(id).success( function (response) {
          $scope.teams.splice(index, 1);
          cache.remove('https://api.parse.com/1/classes/Lists');
        });
      };

    }

  ])

}());