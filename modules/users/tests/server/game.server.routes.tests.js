'use strict';
var should = require('should'),
  request = require('supertest'),
  mongoose = require('mongoose'),
  Game = mongoose.model('Game'),
  User = mongoose.model('User'),
  path = require('path'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, game, game1, user, _user, admin;

/**
 * User routes tests
 */
describe('Game CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {

    // Create a new user
    game1 = {
      title: 'Mocha Test Game',
      platform: 'Xbox One',
      genre: 'Action',
      salt: 'SomeTextHere',
      gameImageUrl: 'Mocha Cover',
      discussions: []
    };

    game = new Game(game1);

    // Save a user to the test db and create new article
    // game.save(function (err) {
      // should.not.exist(err);
      // done();
    // });
    credentials = {
      email: 'admin@admin.com',
      password: 'Partyupgaming1!'
    };

    // Create a new user
    _user = {
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: credentials.username,
      birthday : '1990',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    };

    user = new User(_user);
    return done();
    // Save a user to the test db and create new article
  });

  it('should be able to get games', function (done) {
    agent.get('/api/games')
        .expect(200)
        .end(function (getgameserr, gotgames) {
          if (getgameserr) {
            return done(getgameserr);
          }
          else {
            return done();
          }
        });
  });

  it('should not be able to add a game without admin', function (done) {
    agent.post('/api/games')
        .expect(403)
        .end(function (getgameserr, gotgames) {
          if (getgameserr) {
            return done(getgameserr);
          }
          else {
            return done();
          }
        });
  });

  it('should be able to add game', function (done) {
    agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinerr, signinres) {
          if (signinerr) {
            return done(signinerr);
          }
          else {
            agent.post('/api/games')
                .send(game)
                .expect(200)
                .end(function (addErr, addRes) {
                  if (addErr) {
                    return done(addErr);
                  }
                  else{
                  // addRes.body.title.should.equal(game1.title);
                  // addRes.body.platform.should.equal(game1.platform);
                  // addRes.body.gameImageUrl.should.equal(game1.gameImageUrl);
                    return done();
				          }
                });
          }
        });
  });
  it('should be able to retrieve a list of games', function (done) {
    agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinerr, signinres) {
          if (signinerr) {
            return done(signinerr);
          } else {
            agent.get('/api/games')
                .send(game)
                .expect(200)
                .end(function (addErr, addRes) {
                  if (addErr) {
                    return done(addErr);
                  } else {
                    addRes.body.should.be.instanceof(Array);
                  // addRes.body.title.should.equal(game1.title);
                  // addRes.body.platform.should.equal(game1.platform);
                  // addRes.body.gameImageUrl.should.equal(game1.gameImageUrl);
                    return done();
				          }
                });
          }
        });
  });
/*
  it('should be able to sign in', function (done) {
    agent.post('/authentication/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          if (signinErr) {
            return done(signinErr);
          }
          agent.post('/admin/games')
            .expect(200)
            .end(function (addErr, addRes) {
              return done();
            });
          // agent.post('/admin/games/add')
            // .send(game)
            // .expect(200)
            // .end(function (addErr, addRes) {
              // if (addErr) {
                // return done(addErr);
              // }

              // addRes.body.title.should.equal(game1.title);
              // addRes.body.platform.should.equal(game1.platform);
              // addRes.body.gameImageUrl.should.equal(game1.gameImageUrl);
              // return done();
            // });
        });
  });*/
  /*it('should not be able to retrieve a list of users if not admin', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Request list of users
        agent.get('/api/users')
          .expect(403)
          .end(function (usersGetErr, usersGetRes) {
            if (usersGetErr) {
              return done(usersGetErr);
            }

            return done();
          });
      });
  });

  it('should be able to retrieve a list of users if admin', function (done) {
    user.roles = ['user', 'admin'];

    user.save(function (err) {
      should.not.exist(err);
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Request list of users
          agent.get('/api/users')
            .expect(200)
            .end(function (usersGetErr, usersGetRes) {
              if (usersGetErr) {
                return done(usersGetErr);
              }

              usersGetRes.body.should.be.instanceof(Array).and.have.lengthOf(1);

              // Call the assertion callback
              return done();
            });
        });
    });
  });

  it('should be able to get a single user details if admin', function (done) {
    user.roles = ['user', 'admin'];

    user.save(function (err) {
      should.not.exist(err);
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get single user information from the database
          agent.get('/api/users/' + user._id)
            .expect(200)
            .end(function (userInfoErr, userInfoRes) {
              if (userInfoErr) {
                return done(userInfoErr);
              }

              userInfoRes.body.should.be.instanceof(Object);
              userInfoRes.body._id.should.be.equal(String(user._id));

              // Call the assertion callback
              return done();
            });
        });
    });
  });

  it('should be able to update a single user details if admin', function (done) {
    user.roles = ['user', 'admin'];

    user.save(function (err) {
      should.not.exist(err);
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get single user information from the database

          var userUpdate = {
            firstName: 'admin_update_first',
            lastName: 'admin_update_last',
            roles: ['admin']
          };

          agent.put('/api/users/' + user._id)
            .send(userUpdate)
            .expect(200)
            .end(function (userInfoErr, userInfoRes) {
              if (userInfoErr) {
                return done(userInfoErr);
              }

              userInfoRes.body.should.be.instanceof(Object);
              userInfoRes.body.firstName.should.be.equal('admin_update_first');
              userInfoRes.body.lastName.should.be.equal('admin_update_last');
              userInfoRes.body.roles.should.be.instanceof(Array).and.have.lengthOf(1);
              userInfoRes.body._id.should.be.equal(String(user._id));

              // Call the assertion callback
              return done();
            });
        });
    });
  });

  it('should be able to delete a single user if admin', function (done) {
    user.roles = ['user', 'admin'];

    user.save(function (err) {
      should.not.exist(err);
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          agent.delete('/api/users/' + user._id)
            //.send(userUpdate)
            .expect(200)
            .end(function (userInfoErr, userInfoRes) {
              if (userInfoErr) {
                return done(userInfoErr);
              }

              userInfoRes.body.should.be.instanceof(Object);
              userInfoRes.body._id.should.be.equal(String(user._id));

              // Call the assertion callback
              return done();
            });
        });
    });
  });*/
});
