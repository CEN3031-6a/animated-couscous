'use strict';

describe('Users E2E Tests:', function () {
    // Create a new user
  var user1 = {
    firstName: 'Full',
    lastName: 'Name',
    displayName: 'Full Name',
    email: 'admin@admin.com',
    birthday : '1990',
    username: 'admin@admin.com',
    password: 'Partyupgaming1!',
    provider: 'local'
  };

  var user2 = {
    firstName: 'test',
    lastName: 'user2',
    email: 'test.user2@meanjs.com',
    username: 'testUser2',
    password: 'P@$$w0rd!!'
  };

  var signout = function () {
    // Make sure user is signed out first
    browser.get('http://localhost:3001/api/auth/signout');
    // Delete all cookies
    browser.driver.manage().deleteAllCookies();
  };

  describe('Signin', function () {
    it('Should be able to sign in', function () {
      browser.get('http://localhost:3001/');
      element(by.css('[ng-click="openSignin()"]')).click();
      element(by.model('credentials.email')).sendKeys(user1.email);
      // Enter Password
      element(by.model('credentials.password')).sendKeys(user1.password);
      // Click Submit button
      element(by.css('button[type=submit]')).click();
    });
  });
  describe('Add Game to My Games', function () {
    it('Should be able to add a game to my games list', function () {
      element(by.css('img[class=header-profile-image]')).click();
      element(by.css('a[href="/settings/games"]')).click();
      element(by.css('button[href="/settings/add-game"]')).click();
      element.all(by.css('[ng-click="addGameToLibrary(game)"]')).get(0).click();
      element(by.buttonText('Done')).click();
    });
  });
  describe('Add Game to Master List', function () {
    it('Should be able to add a game to the master list', function () {
      element(by.css('a[class="dropdown-toggle ng-binding ng-scope"]')).click();
      element(by.css('a[href="/admin/games"]')).click();
      element(by.model('search')).sendKeys("NHL");
      element(by.css('button[href="/admin/games/add"]')).click();
      element(by.model('title')).sendKeys("FIFA 16");
      element(by.model('platform')).sendKeys("Xbox One");
      element(by.model('genre')).sendKeys("Sports");
      element(by.model('gameurl')).sendKeys("http://ecx.images-amazon.com/images/I/71M27EptkaL._SX425_.jpg");
      element(by.css('button[type="submit"]')).click();
    });
  });
});