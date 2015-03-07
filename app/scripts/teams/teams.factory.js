;(function (){
  
  'use strict';

  angular.module('STM')

  .factory('TeamsFactory', ['$http', 'PARSE', 'UserFactory',

    function ($http, PARSE, UserFactory) {

      var user = UserFactory.user();

      var getAllTeams = function () {
        return $http.get(PARSE.URL + 'classes/Teams', {
          headers: PARSE.CONFIG.headers,
          cache: true
        });
      };

      var addTeam = function (teamObj) {
        // Add User Pointer to my list object
        teamObj.user = {
          __type: 'Pointer',
          className: '_User',
          objectId: user.objectId
        }

        // Set up Access Control
        var ACLObj = {};
        ACLObj[user.objectId] = {
          'read' : true,
          'write' : true
        }

        listObj.ACL = ACLObj;

        return $http.post(PARSE.URL + 'classes/Teams', listObj);
      };

      var deleteTeam = function (id) {
        return $http.delete(PARSE.URL + 'classes/Teams/' + id);
      };
    
  
      return {
        get : getAllTeams,
        add : addTeam,
        del : deleteTeam
      };

    }

  ])

}());