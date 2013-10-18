/* jshint node:true, indent:2, white:true, laxcomma:true, undef:true, strict:true, unused:true, eqnull:true, camelcase: false, trailing: true */
'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NodeappGenerator = module.exports = function NodeappGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NodeappGenerator, yeoman.generators.Base);

NodeappGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  //console.log(this.yeoman);
  console.log("Welcome to nodeapp generator, version " + this.pkg.version);
  var prompts = [
  // project name
    {
      type: 'input',
      name: 'projectName',
      message: 'Insert the name of the project'
    },
    // project extras
    {
      type: 'checkbox',
      name: 'extras',
      message: 'Which libraries do you want to use in this application?',
      choices : [
        {
          name : 'Redis',
          checked: false
        },
        {
          name : 'CouchDB',
          checked: false
        }
      ]
    }
  ];

  this.prompt(prompts, function (props) {
    this.extras = props.extras;
    this.applicationName = props.projectName;
    cb();
  }.bind(this));
};

NodeappGenerator.prototype.app = function app() {
  this.mkdir('routes');
  this.mkdir('out');

  this.copy('_.gitignore', '.gitignore');
  this.copy('_app.js', 'app.js');
  this.copy('_coolog.json', 'coolog.json');
  this.copy('_.env', '.env');
  this.copy('routes/_site.js', 'routes/site.js');

  this.template('_package.json', 'package.json');
};

NodeappGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
