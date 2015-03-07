;(function (){
  
  'use strict';

  angular.module('STM')

  .controller('PlayersCtrl', ['$scope', 'PlayersFactory', '$routeParams',

    function ($scope, PlayersFactory, $routeParams) {

      $scope.listTitle = '';
      $scope.items = [];

      PlayersFactory.listTitle($routeParams.id).success ( function (data) {
        $scope.listTitle = data.title;
      });

      PlayersFactory.get($routeParams.id).success( function (data) {
        $scope.items = data.results;
      });

      $scope.addPlayer = function (itemObj) {
        PlayersFactory.add(itemObj, $routeParams.id)
          .success( function (res) {
            $scope.item = {};
            $scope.items.push(itemObj);
          }
        );
      };
    
    }

  ]);

}());