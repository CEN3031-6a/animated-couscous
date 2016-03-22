'use strict';

angular.module('users').controller('ViewGameLibraryController', ['$scope', '$http', '$filter', 'Game', 'Users', 'Authentication',
  function ($scope, $http, $filter, Game, Users, Authentication) {
    $scope.user = Authentication.user;

    // User.games.query(function (data) {
    //   $scope.user.games = data;
    //   $scope.buildPager();
    // });

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.user.games, {
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
  }
]);
