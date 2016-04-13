'use strict';

/**
 * Module dependencies.
 */
var adminPolicy = require('../policies/admin.server.policy'),
  admin = require('../controllers/admin.server.controller'),
  game = require('../controllers/games.server.controller');

module.exports = function (app) {
  // User route registration first. Ref: #713
  require('./users.server.routes.js')(app);

  // Users collection routes
  app.route('/api/users')
    .get(adminPolicy.isAllowed, admin.list);

  app.route('/api/games')
    .get(adminPolicy.isAllowed, admin.listGames)
    .post(adminPolicy.isAllowed, admin.addGame);
    //.put(game.addDiscussionToGame);


  app.route('/api/games/:gameID')
    .get(adminPolicy.isAllowed, admin.readGame)
    .put(adminPolicy.isAllowed, admin.updateGame)
    .delete(adminPolicy.isAllowed, admin.deleteGame);

  //app.route('/api/games/picture').post(admin.addGamePicture);

  app.param('gameID', admin.gameByID);

  // Single user routes
  app.route('/api/users/:userId')
    .get(adminPolicy.isAllowed, admin.read)
    .put(adminPolicy.isAllowed, admin.update)
    .delete(adminPolicy.isAllowed, admin.delete);

  // Finish by binding the user middleware
  app.param('userId', admin.userByID);


};
