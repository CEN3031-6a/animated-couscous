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

exports.addGameToUserList = function (req, res) {
  var game = req.model;
  User.findone({ username: req.username }).games.push(game);
  User.findone({ username: req.username }).save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
  });
  User.findone({ username: req.username }).populate('games').exec(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
  });	
};  

exports.deleteGameFromUserList = function (req, res) {
  User.findone({ username: req.username }).games.remove(req.id);
  User.findone({ username: req.username }).save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
  });
  User.findone({ username: req.username }).populate('games').exec(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
  });	
}; 

exports.addDiscussion = function (req, res) {
  var game = req.model;
  var currentDate = new Date();
  game.discussions.push({
    title: req.body.title,
    description: req.body.description,	
    OP: req.body.OP,
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
exports.deleteDiscussion = function (req, res) {
  var game = req.model;
  game.discussions.id(req.id).remove();
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
