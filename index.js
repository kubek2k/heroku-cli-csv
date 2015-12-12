'use strict';
exports.topic = {
  name: 'csv',
  // this is the help text that shows up under `heroku help`
  description: 'Comma separated config values'
};

exports.commands = [
  require('./commands/list.js'),
  require('./commands/add.js'),
  require('./commands/remove.js'),
  require('./commands/append.js'),
  require('./commands/remove-index.js'),
  require('./commands/update-index.js')
];
