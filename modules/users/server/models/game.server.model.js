'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Sub document for Discussions

var DiscussionSchema = new Schema({
  title: {
    type: String,
    trim: true,
    default: '',
  },
  description: {
    type: String,
    default: ''
  },
  OP: {
    type: String
  },
  gameID: {
    type: Number
  },
  updated: {
    type: Date
  },
});

/**
 * Games Schema
 */
var GamesSchema = new Schema({
  title: {
    type: String,
    trim: true,
    default: '',
  },
  platform: {
    type: String,
    default: ''
  },
  genre: {
    type: String,
    default: ''
  },
  salt: {
    type: String
  },
  gameImageURL: {
    type: String,
    default: 'modules/users/client/img/profile/default.png'
  },
  users: [{ type: Schema.ObjectId, ref: 'User' }],
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  discussions: [DiscussionSchema],
});

GamesSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.updated = currentDate;
  if (!this.created)
    this.created = currentDate;

  next();
});
//games model holds title, genre, gameImageURL and platform

mongoose.model('Game', GamesSchema);
