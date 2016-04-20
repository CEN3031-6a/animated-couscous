'use strict';

angular.module('users').controller('GamePageController', ['$scope', '$http', '$filter', 'Game', 'gameResolve', 'Discussion', 'Users', 'Authentication',
  function($scope, $http, $filter, Game, gameResolve, Discussion, Users, Authentication) {
    $scope.discussions = [];
    $scope.game = gameResolve;
    Discussion.query(function(data) {
      $scope.discussions = data;
      console.log($scope.discussions);
    });

    $scope.addDiscussionToGame = function (discussion) {
      $scope.game.discussions.push(discussion);
      console.log(discussion);

      var game = new Game($scope.game);

      game.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'gameForm');

        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };




    /*
    $scope.user = Authentication.user;

    Game.query(function (data) {
      $scope.games = data;
      $scope.buildPager();
    });

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.games, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
    */
  }
]);
