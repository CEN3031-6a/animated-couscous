'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Game',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    
    $scope.query = '';
    $scope.userInput = '';
    $scope.applySearch = function() {
      $scope.query = $scope.userInput;
    };

    $scope.imgSrc = '';
    $scope.query2 = '';
    $scope.applyXboxFilter = function() {
      $scope.query2 = 'Xbox One';
      $scope.imgSrc = 'modules/core/client/img/brand/xbox-logo.png';
    };
    $scope.applyPS4Filter = function() {
      $scope.query2 = 'PS4';
      $scope.imgSrc = 'modules/core/client/img/brand/playstation-logo.png';
    };
    $scope.applyPCFilter = function() {
      $scope.query2 = 'PC';
      $scope.imgSrc = 'modules/core/client/img/brand/steam-logo.png';
    };
  }
]);
