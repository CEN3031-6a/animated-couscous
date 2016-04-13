'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  fs = require('fs'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Game = mongoose.model('Game'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  multer = require('multer'),
  config = require(path.resolve('./config/config'));


exports.listGames = function(req, res) {
  Game.find().sort('-created').exec(function(err, games) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(games);
  });

};

exports.deleteGame = function(req, res) {
  var games = req.model;

  games.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(games);
  });
};

exports.updateGame = function(req, res) {
  var games = req.model;

  //For security purposes only merge these parameters
  games.title = req.body.title;
  games.platform = req.body.platform;
  games.discussions = req.body.discussions;

  games.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(games);
  });
};

exports.addGame = function(req, res) {
  var game = new Game(req.body);
  // var message = null;
  // var upload = multer(config.uploads.profileUpload).single('newGamePicture');
  // var gameUploadFileFilter = require(path.resolve('./config/lib/multer')).gameUploadFileFilter;

  //game.gameImageURL = config.uploads.profileUpload.dest + req.file.filename;

  game.save(function(err) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(game);
    }
  });
};

/**
 * Show the current user
 */
exports.read = function(req, res) {
  res.json(req.model);
};

exports.readGame = function(req, res) {
  res.json(req.model);
};

/**
 * Update a User
 */
exports.update = function(req, res) {
  var user = req.model;

  //For security purposes only merge these parameters
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.displayName = user.firstName + ' ' + user.lastName;
  /*object.onload = funcRef;
  object.onload = function(){
     var roles = document.getElementById('roles');
  
    if (roles.checked){ */
		//user.roles = 'admin';
	/* }
	else { */ 
		user.roles = 'user'; /*
	}
    } */
  	
  //user.roles = req.body.roles;

  user.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * Delete a user
 */
exports.delete = function(req, res) {
  var user = req.model;

  user.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * List of Users
 */
exports.list = function(req, res) {
  User.find({}, '-salt -password').sort('-created').populate('user', 'displayName').exec(function(err, users) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(users);
  });
};

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id, '-salt -password').exec(function(err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load user ' + id));
    }

    req.model = user;
    next();
  });
};

exports.gameByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Game is invalid'
    });
  }

  Game.findById(id).exec(function(err, game) {
    if (err) {
      return next(err);
    } else if (!game) {
      return next(new Error('Failed to load game ' + id));
    }

    req.model = game;
    next();
  });
};

// exports.addGamePicture = function (req, res) {
//   var game = req.game;
//   var message = null;
//   var upload = multer(config.uploads.profileUpload).single('newGamePicture');
//   var gameUploadFileFilter = require(path.resolve('./config/lib/multer')).gameUploadFileFilter;
//
//   // Filtering to upload only images
//   upload.fileFilter = gameUploadFileFilter;
//
//   if (game) {
//     upload(req, res, function (uploadError) {
//       if(uploadError) {
//         return res.status(400).send({
//           message: 'Error occurred while uploading game picture'
//         });
//       } else {
//         game.gameImageURL = config.uploads.profileUpload.dest + req.file.filename;
//
//         user.save(function (saveError) {
//           if (saveError) {
//             return res.status(400).send({
//               message: errorHandler.getErrorMessage(saveError)
//             });
//           } else {
//             req.login(user, function (err) {
//               if (err) {
//                 res.status(400).send(err);
//               } else {
//                 res.json(user);
//               }
//             });
//           }
//         });
//       }
//     });
//   } else {
//     res.status(400).send({
//       message: 'User is not signed in'
//     });
//   }
// };
