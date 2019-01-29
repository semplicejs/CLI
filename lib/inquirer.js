const inquirer   = require('inquirer');
const fs = require('fs');
const path =  require('path');

module.exports = {

  ask: () => {
    const questions = [
      {
        name: 'name',
        type: 'input',
        message: 'Name of your new project:',
        validate: function( value ) {
          if (fs.existsSync(path.join(path.resolve(),`${value}`))) {
            return 'The name of the project or directory already exists, please use another name';
          } else {
            if (value.length) {
              return true;
            } else {
              return 'Please enter your project name.';
            }
          }
        }
      },
      {
        name: 'description',
        type: 'input',
        message: 'Enter of your project description:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your project description.';
          }
        }
      },
      {
        name: 'author',
        type: 'input',
        message: 'Enter author',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter author.';
          }
        }
      },
      {
        name: 'homepage',
        type: 'input',
        default:'',
        message: 'Enter of your project homepage',
        validate: function(value) {
          return true;
        }
      },
      {
        name: 'repository',
        type: 'input',
        default:'',
        message: 'Enter of your project git repository',
        validate: function(value) {
          return true;
        }
      },
      {
        name: 'license',
        type: 'input',
        message: 'Enter of your project license',
        default: 'ISC',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your project license.';
          }
        }
      },
      {
        name: 'database',
        type: 'list',
        message: 'your project uses a database?',
        choices: ['no','mongodb'],
        default: 0,
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a database';
          }
        }
      },
    ];
    return inquirer.prompt(questions);
  },
}