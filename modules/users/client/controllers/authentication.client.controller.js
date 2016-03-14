'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator', '$modal', '$modalStack', '$log',
  function($scope, $state, $http, $location, $window, Authentication, PasswordValidator, $modal, $modalStack, $log) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    $scope.signup = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signup', $scope.credentials).success(function(response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
        $modalStack.dismissAll(); // dismiss modal after signup
      }).error(function(response) {
        $scope.error = response.message;
      });
    };

    $scope.signin = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signin', $scope.credentials).success(function(response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
        $modalStack.dismissAll(); // dismiss modal after signin
      }).error(function(response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function(url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };

    $scope.openSignup = function(size) {
      console.log('modal opening');

      var modalInstance = $modal.open({
        templateUrl: 'modules/users/client/views/authentication/signup.client.view.html',
        controller: 'ModalInstanceCtrl',
        size: size
      });

      modalInstance.result.then(function() {
        //$scope.signup;
      }, function() {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.openSignin = function(size) {
      console.log('modal opening');

      var modalInstance = $modal.open({
        templateUrl: 'modules/users/client/views/authentication/signin.client.view.html',
        controller: 'ModalInstanceCtrl',
        size: size
      });

      modalInstance.result.then(function() {
        //$scope.signup;
      }, function() {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  }
]);

angular.module('users').controller('ModalInstanceCtrl', function($scope, $modalInstance, $state, $http, $location, $window, Authentication, PasswordValidator) {

  $scope.authentication = Authentication;
  $scope.popoverMsg = PasswordValidator.getPopoverMsg();

  $scope.signin = function(isValid) {
    $scope.error = null;

    if (!isValid) {
      $scope.$broadcast('show-errors-check-validity', 'userForm');

      return false;
    }

    $http.post('/api/auth/signin', $scope.credentials).success(function(response) {
      // If successful we assign the response to the global user model
      $scope.authentication.user = response;

      // And redirect to the previous or home page
      $state.go($state.previous.state.name || 'home', $state.previous.params);
      $modalInstance.close();
      console.log("modal inst");
    }).error(function(response) {
      $scope.error = response.message;
    });
  };

  $scope.signup = function(isValid) {
    $scope.error = null;

    if (!isValid) {
      $scope.$broadcast('show-errors-check-validity', 'userForm');

      return false;
    }

    $http.post('/api/auth/signup', $scope.credentials).success(function(response) {
      // If successful we assign the response to the global user model
      $scope.authentication.user = response;

      // And redirect to the previous or home page
      $state.go($state.previous.state.name || 'home', $state.previous.params);
      $modalInstance.close();
    }).error(function(response) {
      $scope.error = response.message;
    });
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
