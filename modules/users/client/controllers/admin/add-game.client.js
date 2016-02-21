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
        $location.path('/admin/games/add' +errorResponse.data);
		  // $scope.title = '';
		  // $scope.platform = '';
		  // $scope.gameurl = '';
		  // $scope.error = errorResponse.data;
      });
	  
      // Game.addGame(newGame).then(function(response){$state.go('admin.games');
      // }, function(error){$scope.error = 'Unable to save game!\n' + error;
      // });
		
    };
  }
]);
