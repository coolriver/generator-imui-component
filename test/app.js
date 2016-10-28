'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-imui-component:app', function () {
  this.timeout(5000);

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'testComp',
        author: 'coolriver',
        stateless: true
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'components/testComp/index.jsx',
      'components/testComp/style/index.scss',
      'components/testComp/lib/TestComp.jsx',
      'components/testComp/demo/demo.jsx',
      'components/testComp/demo/demo.scss',
      'components/testComp/demo/index.html',
      'components/testComp/demo/doc.md'
    ]);
  });

});
