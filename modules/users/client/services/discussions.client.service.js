'use strict';

angular.module('users').factory('Discussion', ['$resource',
  function($resource) {
    return $resource('api/discussions', null, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

angular.module('users').factory('Discussion', ['$resource',
  function ($resource) {
    return $resource('api/discussions/:discussionId', {
      discussionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
