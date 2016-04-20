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
      browser.sleep(2000);
      element(by.css('[ng-click="openSignin()"]')).click();
      browser.sleep(2000);
      element(by.model('credentials.email')).sendKeys(user1.email);
      // Enter Password
      element(by.model('credentials.password')).sendKeys(user1.password);
      // Click Submit button
      browser.sleep(2000);      
      element(by.css('button[type=submit]')).click();
    });
  });
  describe('Add Game to My Games', function () {
    it('Should be able to add a game to my games list', function () {
      element(by.css('img[class=header-profile-image]')).click();
      browser.sleep(2000);
      element(by.css('a[href="/settings/games"]')).click();
      browser.sleep(2000);
      element(by.css('button[href="/settings/add-game"]')).click();
      browser.sleep(2000);
      element.all(by.css('[ng-click="addGameToLibrary(game)"]')).get(0).click();
      browser.sleep(2000);
      element(by.buttonText('Done')).click();
    });
  });
  describe('Add Game to Master List', function () {
    it('Should be able to add a game to the master list', function () {
      element(by.css('a[class="dropdown-toggle ng-binding ng-scope"]')).click();
      browser.sleep(2000);
      element(by.css('a[href="/admin/games"]')).click();
      browser.sleep(2000);
      element(by.model('search')).sendKeys("NHL");
      element(by.css('button[href="/admin/games/add"]')).click();
      element(by.model('title')).sendKeys("FIFA 16");
      element(by.model('platform')).sendKeys("Xbox One");
      element(by.model('genre')).sendKeys("Sports");
      element(by.model('gameurl')).sendKeys("http://ecx.images-amazon.com/images/I/71M27EptkaL._SX425_.jpg");
      browser.sleep(2000);      
      element(by.css('button[type="submit"]')).click();
    });
  });
  describe('View Game Details and Update', function () {
    it('Should be able to delete a game from the master list', function () {
      browser.sleep(2000);
      element.all(by.css('a[class="list-group-item ng-scope"]')).get(0).click();
      browser.sleep(2000);
      element(by.css('a[ui-sref="admin.game-edit({gameID: game._id})"]')).click();
      browser.sleep(2000);
      element(by.model('game.title')).clear();
      element(by.model('game.title')).sendKeys("FIFA 15");
      browser.sleep(2000);
      element(by.css('input[value="Update"]')).click();
      browser.sleep(2000);
      expect(element(by.css('div [ng-bind="game.title"]')).getText()).toBe('FIFA 15');
    });
  });
  describe('Create a chatroom and chat', function () {
    it('Should create a chatroom and send a message', function () {
      browser.get('http://localhost:3001/');
      browser.sleep(2000);
      element(by.css('a[ui-sref="game({gameID: game._id})"]')).click();
      browser.sleep(2000);
      element(by.css('a[href="/create-discussion"]')).click();
      browser.sleep(2000);
      var randomvalue = Date.now();
      element(by.model('title')).sendKeys("Test Post Please Ignore" + randomvalue);
      element(by.model('selectedGame')).sendKeys("NHL");
      element(by.css('button[type="submit"]')).click();
      browser.sleep(2000);
      element(by.model('messageText')).sendKeys("Hello");
      browser.sleep(2000);
      element(by.css('button[type="submit"]')).click();
      browser.sleep(2000);
    });
  });
  describe('Sign Up', function () {
    it('Should sign up', function () {
      browser.get('http://localhost:3001/');
      browser.sleep(2000);
      element(by.css('img[class=header-profile-image]')).click();
      browser.sleep(2000);
      element(by.css('a[href="/api/auth/signout"]')).click();
      browser.sleep(2000);
      element(by.css('[ng-click="openSignup()"]')).click();
      browser.sleep(2000);
      element(by.model('credentials.email')).sendKeys('aaaaaaaaaaaaa@aaaaaa.com');
      element(by.model('credentials.password')).sendKeys('Partyupgaming1!');
      element(by.model('credentials.birthday')).sendKeys('11/11/1111');
      element(by.model('credentials.xboxlive')).sendKeys('beepboop1');
      element(by.model('credentials.psn')).sendKeys('beepboop2');
      element(by.model('credentials.steam')).sendKeys('beepboop3');	
      browser.sleep(2000);	  
      element(by.css('button[type=submit]')).click();
    });
  });
});