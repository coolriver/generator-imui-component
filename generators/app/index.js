'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var moment = require('moment');

function hyphenToCamel(hyphen) {
  var toUpper = function (match, letter) {
    return letter.toUpperCase();
  };

  return hyphen.replace(/-(\w)/g, toUpper) // 中划后字母大写
    .replace(/^(\w)/g, toUpper); // 首字母大写
}

module.exports = yeoman.Base.extend({
  prompting: function () {
    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Input the name of the component:'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Input the author of the component:'
      },
      {
        type: 'confirm',
        name: 'stateless',
        message: 'Want to use stateless component?'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.upperName = hyphenToCamel(this.props.name);
      this.props.date = moment().format('YYYY-MM-DD');
    }.bind(this));
  },

  writing: function () {
    console.log(this.args);

    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath(`components/${this.props.name}/`),
      this.props
    );

    this.fs.move(
      this.destinationPath(`components/${this.props.name}/lib/$upperName.jsx`),
      this.destinationPath(`components/${this.props.name}/lib/${this.props.upperName}.jsx`)
    );
  },

  end: function () {
    this.log(`create component ${chalk.green(this.props.name)} success!`);
    this.log(`component loacated in dir: ${chalk.green(this.destinationPath(this.props.name + '/'))}`);
  }
});
