'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Discussion = mongoose.model('Discussion'),
  Game = mongoose.model('Game'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a discussion
 */
exports.create = function (req, res) {
  var discussion = new Discussion(req.body);
  // post.game = req.game;
  // post.user = req.user;

  discussion.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(discussion);
    }
  });
};

/**
 * Show the current discussion
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var discussion = req.discussion ? req.discussion.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".

  // discussion.isCurrentUserOwner = !!(req.user && discussion.originalPoster && discusison.originalPoster._id.toString() === req.user._id.toString());

  res.json(discussion);
};

/**
 * Update a discussion
 */
exports.update = function (req, res) {
  var discussion = req.post;

  discussion.title = req.body.title;
  discussion.content = req.body.content;

  discussion.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(discussion);
    }
  });
};

/**
 * Delete a discussion
 */
exports.delete = function (req, res) {
  var discussion = req.discussion;

  discussion.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(discussion);
    }
  });
};

/**
 * List of Discussions
 */
exports.list = function (req, res) {
  Discussion.find().sort('-created').populate('originalPoster').exec(function (err, discussions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(discussions);
    }
  });
};

/**
 * Discussion middleware
 */
exports.discussionByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Discussion is invalid'
    });
  }

  Discussion.findById(id).populate('originalPoster', 'screenNames').exec(function (err, discussion) {
    if (err) {
      return next(err);
    } else if (!discussion) {
      return res.status(404).send({
        message: 'No discussion with that identifier has been found'
      });
    }
    req.discussion = discussion;
    next();
  });
};
