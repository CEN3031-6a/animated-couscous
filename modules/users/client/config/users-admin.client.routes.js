'use strict';

// Setting up route
angular.module('users.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin.users', {
        url: '/users',
        templateUrl: 'modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListController'
      })
      .state('admin.games', {
        url: '/games',
        templateUrl: 'modules/users/client/views/admin/list-games.client.view.html',
        controller: 'GamesListController'
      })
      .state('admin.games-add', {
        url: '/games/add',
        templateUrl: 'modules/users/client/views/admin/add-game.client.view.html',
        controller: 'AddGameController'
      })
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: 'modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: 'modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('admin.game', {
        url: '/games/:gameID',
        templateUrl: 'modules/users/client/views/admin/view-game.client.view.html',
        controller: 'GameController',
        resolve: {
          gameResolve: ['$stateParams', 'Game', function ($stateParams, Game) {
            return Game.get({
              gameID: $stateParams.gameID
            });
          }]
        }
      })
      .state('admin.game-edit', {
        url: '/games/:gameID/edit',
        templateUrl: 'modules/users/client/views/admin/edit-game.client.view.html',
        controller: 'GameController',
        resolve: {
          gameResolve: ['$stateParams', 'Game', function ($stateParams, Game) {
            return Game.get({
              gameID: $stateParams.gameID
            });
          }]
        }
      });
  }
]);
