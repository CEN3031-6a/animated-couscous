'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DiscussionSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    default: '',
  },
  description: {
    type: String,
    default: ''
  },
  originalPoster: { type: Schema.ObjectId, ref: 'User' },
  game: { type: Schema.ObjectId, ref: 'Game' },
  comments: [{
    content: String,
    createdBy: { type: Schema.ObjectId, ref: 'User' }
  }],
  updated: {
    type: Date
  },
});

DiscussionSchema.pre('save', function (next) {
  var currentDate = new Date();
  this.updated = currentDate;
  if (!this.created)
    this.created = currentDate;

  next();
});

mongoose.model('Discussion', DiscussionSchema);
