const Application = require("spectron").Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const testPage = require('./test.page.js');

var page = new testPage();

var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

if (process.platform === 'win32') {
    electronPath += '.cmd';
}

// Path to your application
var appPath = path.join(__dirname, '..');

var app = new Application({
            path: electronPath,
            args: [appPath]
        });

global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
    page.setApp(app);
});

describe('Test Example', function () {
  beforeEach(function () {
      return app.start();
  });

  afterEach(function () {
      return app.stop();
  });

  it('opens a window', function () {
    return page.getWindowCount().should.eventually.equal(page.windowCount);
  });

  it('tests the title', function () {
    return page.getApplicationTitle().should.eventually.equal(page.pageTitle);
  });

  it('clicks the button', function() {
    return page.clickButtonAndGetText().should.eventually.equal(page.helloText);
  });
});