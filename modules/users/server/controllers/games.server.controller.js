'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Game = mongoose.model('Game'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


exports.addDiscussion = function (req, res) {
  var game = req.model;
  var currentDate = new Date();
  game.discussions.push({
    title: req.body.title,
    description: req.body.description,
    OP: req.body.OP,
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

exports.listDiscussion = function (req, res) {
  var game = req.model;
  game.discussions.find({}).sort('-updated').populate('title', 'description').exec(function (err, gamediscussions) {
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
