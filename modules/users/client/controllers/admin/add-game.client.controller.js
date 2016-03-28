'use strict';

angular.module('users').controller('AddGameController', ['$scope', '$state', '$window', '$timeout',  '$http', '$location', 'Game', 'Authentication',
  'FileUploader', function($scope, $state, $window, $timeout, $http, $location, Game, Authentication, FileUploader) {

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;
    $scope.imageURL = '';

    $scope.addGame = function() {
      var newGame = new Game({
        title: $scope.title,
        platform: $scope.platform,
        genre: $scope.genre,
        gameImageURL: $scope.imageURL
      });

      newGame.$save(function(response) {
        $location.path('/admin/games');
        $scope.title = '';
        $scope.platform = '';
        $scope.genre = '';
        $scope.imageURL = '';
      }, function(errorResponse) {
        $scope.title = '';
        $scope.platform = '';
        $scope.genre = '';
        $scope.imageURL = '';
        $scope.error = errorResponse.data;
      });


    };

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/games',
      alias: 'newGamePicture'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function(item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function(fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function(fileReaderEvent) {
          $timeout(function() {
            $scope.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      //
      $scope.user = Authentication.user = response;

      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    // $scope.uploadGamePicture = function() {
    //   // Clear messages
    //   $scope.success = $scope.error = null;
    //
    //   // Start upload
    //   $scope.uploader.uploadAll();
    // };

    // Cancel the upload process
    $scope.cancelUpload = function() {
      $scope.uploader.clearQueue();
      $scope.imageURL = $scope.game.gameImageURL;
    };

  }
]);
