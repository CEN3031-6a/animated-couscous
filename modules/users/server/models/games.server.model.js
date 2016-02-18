'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  validator = require('validator'),
  generatePassword = require('generate-password'),
  owasp = require('owasp-password-strength-test');

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
  salt: {
    type: String
  },
  gameImageURL: {
    type: String,
    default: 'modules/users/client/img/profile/default.png'
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  discussions: [],
});


GamesSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.updated = currentDate;
  if (!this.created)
    this.created = currentDate;

  next();
});


mongoose.model('Game', GamesSchema);
