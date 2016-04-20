'use strict';

// Protractor configuration
var config = {
  specs: ['modules/users/tests/e2e/users.e2e.tests.js']
};

if (process.env.TRAVIS) {
  config.capabilities = {
    browserName: 'firefox'
  };
}

exports.config = config;
