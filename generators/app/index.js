'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const moment = require('moment');
const path = require('path');
const validation = require('../../lib/validation');

function hyphenToCamel(hyphen) {
  const toUpper = function (match, letter) {
    return letter.toUpperCase();
  };

  return hyphen.replace(/-(\w)/g, toUpper) // 中划后字母大写
    .replace(/^(\w)/g, toUpper); // 首字母大写
}

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.distPath = path.resolve(this.destinationPath(`components/`));
  },
  prompting: function () {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Input the name of the component:',
        validate: v => {
          if (!validation.isHyphen(v)) {
            return 'Must input hyphen name(eg. comp-name, compname, compname2)';
          }

          if (validation.nameConflict(v, this.distPath)) {
            return `component ${v} has already exists, please create a new component`;
          }

          return true;
        }
      },
      {
        type: 'input',
        name: 'author',
        message: 'Input the author of the component:',
        validate: v => {
          if (validation.notEmpty(v)) {
            return true;
          }

          return 'Author can not be null';
        }
      },
      {
        type: 'confirm',
        name: 'stateless',
        message: 'Want to use stateless component?',
        default: false
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
    this.fs.copyTpl(
      this.templatePath('**/*'),
      path.resolve(this.distPath, `${this.props.name}`),
      this.props
    );

    this.fs.move(
      path.resolve(this.distPath, `${this.props.name}/lib/$upperName.jsx`),
      path.resolve(this.distPath, `${this.props.name}/lib/${this.props.upperName}.jsx`)
    );
  },

  end: function () {
    this.log(`create component ${chalk.green(this.props.name)} success!`);
    this.log(`component loacated in dir: ${chalk.green(path.resolve(this.distPath, `${this.props.name}`))}`);
  }
});
