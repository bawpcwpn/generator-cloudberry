'use strict';
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('Less feature', function () {
  describe('on', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withPrompts({features: [
          'inclueLess'
        ]})
        .on('end', done);
    });

    it('should add dependencies', function () {
      assert.fileContent('package.json', '"gulp-less"');
      assert.fileContent('package.json', '"gulp-plumber"');
    });

    it('should create an LESS file', function () {
      assert.file('app/styles/main.less');
    });
  });

  describe('off', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withOptions({'babel': false})
        .withPrompts({features: []})
        .on('end', done);
    });

    it('shouldn\'t add dependencies', function () {
      assert.noFileContent('package.json', '"gulp-less"');
      assert.noFileContent('package.json', '"gulp-plumber"');
    });

    it('should create a CSS file', function () {
      assert.file('app/styles/main.css');
    });
  });
});
