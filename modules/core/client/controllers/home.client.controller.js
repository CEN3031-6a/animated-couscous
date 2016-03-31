'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Game',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    
    $scope.query = "";
    $scope.userInput = "";
    $scope.applySearch = function() {
      $scope.query = $scope.userInput;
    };
  }
]);
