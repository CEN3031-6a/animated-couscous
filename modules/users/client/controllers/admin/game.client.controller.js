'use strict';

angular.module('users.admin').controller('GameController', ['$scope', '$state', 'Authentication', 'gameResolve',
  function ($scope, $state, Authentication, gameResolve) {
    $scope.authentication = Authentication;
    $scope.game = gameResolve;

    $scope.remove = function (game) {
      if (confirm('Are you sure you want to delete this game?')) {
        if (game) {
          game.$remove();

          $scope.games.splice($scope.games.indexOf(game), 1);
        } else {
          $scope.game.$remove(function () {
            $state.go('admin.games');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'gameForm');

        return false;
      }

      var game = $scope.game;

      game.$update(function () {
        $state.go('admin.game', {
          gameID: game._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
