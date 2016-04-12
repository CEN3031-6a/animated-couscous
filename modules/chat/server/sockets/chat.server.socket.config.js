'use strict';

// Create the chat configuration
module.exports = function (io, socket) {

  //var rooms = ['room1'];
  //make 'room1' the roomID and everything should work, wooooooooo
  socket.room = 'room1';
  socket.join('room1');

  // Emit the status event when a new socket client is connected
  socket.emit('chatMessage', {
    type: 'status',
    text: 'Is now connected',
    created: Date.now(),
    profileImageURL: socket.request.user.profileImageURL,
    username: socket.request.user.email
  });

  // Send a chat messages to all connected sockets when a message is received
  socket.on('chatMessage', function (message) {
    message.type = 'message';
    message.created = Date.now();
    message.profileImageURL = socket.request.user.profileImageURL;
    message.username = socket.request.user.email;

    // Emit the 'chatMessage' event
    io.sockets.in(socket.room).emit('chatMessage', message);
  });

  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    io.sockets.in(socket.room).emit('chatMessage', {
      type: 'status',
      text: 'disconnected',
      created: Date.now(),
      username: socket.request.user.email
    });
  });
};
