'use strict';

var discussions = require('../controllers/discussions.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/discussions')
    .get(discussions.list)
    .post(discussions.create);

  // Single article routes
  app.route('/api/discussions/:discussionId')
    .get(discussions.read)
    .put(discussions.update)
    .delete(discussions.delete);

  // Finish by binding the article middleware
  app.param('discussionId', discussions.discussionByID);
};
