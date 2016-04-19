'use strict';

// Configure the 'chat' module routes
angular.module('chat').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('chat', {
        url: '/chat/:discussionId',
        templateUrl: 'modules/chat/client/views/chat.client.view.html',
        controller: 'ChatController',
        data: {
          roles: ['user', 'admin']
        },
        resolve: {
          discussionResolve: ['$stateParams', 'Discussion', function($stateParams, Discussion) {
            return Discussion.get({
              discussionId: $stateParams.discussionId
            });
          }]
        }
      });
  }
]);
