'use strict';

angular.module('users').controller('AddGameController', ['$scope', '$state', '$http', '$location', 'Game', 
  function ($scope, $state, $http, $location, Game) {

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    $scope.addGame = function () {
      var newGame = new Game({
        title: $scope.title,
        platform: $scope.platform,
        gameImageURL: $scope.gameurl
      });
	  
      newGame.$save(function(response) {
        $location.path('/admin/games');
        $scope.title = '';
        $scope.platform = '';
        $scope.gameurl = '';
      }, function(errorResponse) {
        $scope.title = '';
        $scope.platform = '';
        $scope.gameurl = '';
        $scope.error = errorResponse.data;
      });
	  
		
    };
  }
]);
