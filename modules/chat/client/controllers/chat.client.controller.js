'use strict';

// Create the 'chat' controller
angular.module('chat').controller('ChatController', ['$scope', '$location', '$stateParams', 'Discussion','discussionResolve', 'Authentication', 'Socket',
  function ($scope, $location, $stateParams, Discussion, discussionResolve, Authentication, Socket) {
    // Create a messages array
    $scope.messages = [];

    $scope.rooms = [{
      messages: [],
      name: ''
    }];

    console.log(discussionResolve);
    // If user is not signed in then redirect back home

    $scope.user = Authentication.user;

    if (!Authentication.user) {
      $location.path('/');
    }

    
    // Make sure the Socket is connected
    if (!Socket.socket) {
      Socket.connect();
    }

    $scope.dID = $stateParams.discussionID;

    var room = { 
      roomID: $scope.dID
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
]);
