'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Game = mongoose.model('Game'),
  Discussion = mongoose.model('Discussion'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


exports.addDiscussions = function (req, res) {
  var game = req.model;
  var currentDate = new Date();
  game.discussions.push({
    title: req.body.title,
    description: req.body.description,
    originalPoster: req.body.originalPoster,
    gameID: game.id,
    updated : currentDate
  });

  game.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(game);
  });
};

exports.addDiscussionToGame = function (req, res, discussionId) {
  var game = req.model;
  var discussion = Discussion.findById(discussionId);
  if (game._id === discussion.game._id) {
    game.discussions.push(discussion);
  }
  game.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
  });
  game.populate('discussions').exec(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
  });
};

/**
 * Delete a Discussion
 */
exports.deleteDiscussion = function (req, res, discussionId) {
  var game = req.model;
  game.discussions.id(discussionId).remove();
  game.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(game);
  });
};

exports.listDiscussions = function (req, res) {
  var game = req.model;
  game.discussions.find({}).sort('-updated').populate('discussions').exec(function (err, gamediscussions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(gamediscussions);
  });
};

exports.readGame = function(req, res) {
  res.json(req.model);
};


/**
 * Game middleware
 */
exports.gameByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Game is invalid'
    });
  }

  Game.findById(id).exec(function (err, game) {
    if (err) {
      return next(err);
    } else if (!game) {
      return next(new Error('Failed to load game ' + id));
    }

    req.model = game;
    next();
  });
};
