'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the cool ' + chalk.red('generator-clekyll') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'postTitle',
      message: 'What\'s the title of the post?'
    }, {
      type: 'confirm',
      name: 'published',
      message: 'Only a draft?'
    }, {
      type: 'confirm',
      name: 'comments',
      message: 'Enable comments?'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    var postDateTime = this._getPostDateTime();
    this.fs.copyTpl(
      this.templatePath('blogTemplate.txt'),
      this.destinationPath(this._toUrl(this.props.postTitle)),
      {
        postTitle: this.props.postTitle,
        postDateTime: postDateTime,
        published: !(this.props.published),
        comments: this.props.comments
      }
    );
    this.log(this.props.postTitle + ' is a stupid title');
  },

  _getPostDateTime: function () {
    return (new Date()).toISOString().slice(0, 10) + ' ' + (new Date()).toISOString().slice(11, 19);
  },

  _toUrl: function (str) {
    var today = (new Date()).toISOString().slice(0, 10);
    return today + '-' + str.replace(' ', '-').toLowerCase() + '.markdown';
  }
});
