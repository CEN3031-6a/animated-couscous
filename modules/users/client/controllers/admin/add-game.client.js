'use strict';

angular.module('users').controller('AddGameController', ['$scope', '$state', '$http', '$location', 'Game', 
  function ($scope, $state, $http, $location, Game) {

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    $scope.addGame = function ($scope) {
      var newGame = {
        title: $scope.title,
        platform: $scope.platform,
        gameImageURL: $scope.url
      };
      Game.addGame(newGame).then(function(response){$state.go('admin.games');
      }, function(error){$scope.error = 'Unable to save game!\n' + error;
      });
		
    };
  }
]);
