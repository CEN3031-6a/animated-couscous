'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Game',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  
  	/* Assignment 5 Implementation.  getAll() not defined in our stack.
    $scope.find = function() {
    	$scope.loading = true;

    	Game.getAll().then(function(response) {
    		$scope.loading = false;
    		$scope.listings = response.data;
    	}, function(error) {
    		$scope.loading = false;
    		$scope.error = 'Unable to retrieve games!\n' + error;
    	});
    };
	*/
  }
]);
