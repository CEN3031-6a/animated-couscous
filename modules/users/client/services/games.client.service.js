'use strict';

// Games service used for communicating with the games REST endpoint
angular.module('users').factory('Game', ['$resource',
  function($resource) {
    return $resource('api/games', null, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
