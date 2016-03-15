'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Discussion Schema
 */
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
  updated: {
    type: Date
  },
});


DiscussionSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.updated = currentDate;
  next();
});


mongoose.model('Discussion', DiscussionSchema);
