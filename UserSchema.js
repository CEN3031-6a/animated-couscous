/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var userSchema = new Schema({
  /* your code here */
  userType: { type: String, required: true},
  username: { type: String, required: true},
  password: { type: String, required: true}, //SET ENCRYPTION
  emailAddress: {type: String, required: true},
  friends: [];
  ignored: [];
  created_at: Date,
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function(next) {
  /* your code here */

  // Code from: (scotch.io) https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
  	this.created_at = currentDate;

  next();
  // End code from: (scotch.io)

});

/* Use your schema to instantiate a Mongoose model */
var Users = mongoose.model('Users', userSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Users;
