'use strict';

// Games service used for communicating with the users REST endpoint
angular.module('users.admin').factory('Game', ['$resource',
  function ($resource) {
    return $resource('api/games', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
