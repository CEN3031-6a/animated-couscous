'use strict';

angular.module('users').controller('GamesController', ['$scope', '$http', '$filter', 'Game', 'Users', 'Authentication',
  function($scope, $http, $filter, Game, Users, Authentication) {
    //$scope.games = [{"_id":"56ec2aab4cc86a81a2bcac89","updated":"2016-03-18T16:19:55.364Z","__v":0,"discussions":[],"created":"2016-03-18T16:19:55.363Z","gameImageURL":"https://upload.wikimedia.org/wikipedia/en/8/81/NHL_16_cover.jpg","platform":"Xbox One","title":"NHL 16"}];
    Game.query(function(data) {
      $scope.games = data;
    });
    /*
    $scope.find = function() {
      
      $scope.loading = true;

      Game.get().then(function(response) {
        $scope.loading = false;
        $scope.games = response.data;
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve games!\n' + error;
      });
    };
    */


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
