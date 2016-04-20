'use strict';

// Create the 'chat' controller
angular.module('chat').controller('ChatController', ['$scope', '$resource', '$location', 'Authentication', 'Socket', 'Discussion', '$stateParams',
  function ($scope, $resource, $location, Authentication, Socket, Discussion, $stateParams) {
    // Create a messages array
    $scope.discussion = Discussion.get({discussionId: $stateParams.discussionId});
    $scope.messages = [];
    console.log($scope.discussion);
    console.log($scope.discussion.comments);

    $scope.rooms = [{
      messages: [],
      name: ''
    }];


    // If user is not signed in then redirect back home

    $scope.user = Authentication.user;

    if (!Authentication.user) {
      $location.path('/');
    }


    // Make sure the Socket is connected
    if (!Socket.socket) {
      Socket.connect();
    }

    console.log($stateParams.discussionId);
    var room = {
      roomID: $stateParams.discussionId
    };
    Socket.emit('createRoom', room);


    // Add an event listener to the 'chatMessage' event
    Socket.on('chatMessage', function (message) {
      //$scope.messages.unshift(message);
      $scope.messages.push(message);
    });

    // Create a controller method for sending messages
    $scope.sendMessage = function () {
      // Create a new message object
      var message = {
        text: this.messageText
      };

      // Emit a 'chatMessage' message event
      Socket.emit('chatMessage', message);

      // Clear the message text
      this.messageText = '';
    };

    // Remove the event listener when the controller instance is destroyed
    $scope.$on('$destroy', function () {
      Socket.removeListener('chatMessage');
    });
  }
