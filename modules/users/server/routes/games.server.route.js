'use strict';

module.exports = function (app) {
  // User Routes
  var games = require('../controllers/games.server.controller');

  app.route('/api/games/:gameId/discussions')
    .get(games.listDiscussions)
    .put(games.addDiscussionToGame)
    .delete(games.deleteDiscussion);

  // Finish by binding the user middleware
  app.param('gameId', games.gameByID);
};
