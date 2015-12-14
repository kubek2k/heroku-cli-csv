'use strict';
const cli = require('heroku-cli-util');
const csv = require('./heroku-csv.js');

function updateCommand(context, heroku) {
  const app = heroku.apps(context.app);
  const key = context.args.config_key;
  const indexToUpdate = context.args.index;
  return csv.getConfigArray(app, key)
    .then(function(configArray) {
      return csv.setConfigArray(app, key, configArray.map(function (v, index) { 
        if (index == indexToUpdate) {
          return context.args.new_value;
        }
        return v;
      }));
    })
  .then(function() {
    cli.log("Value under index " + indexToUpdate + " under key " + cli.color.cyan(key) + " for app " + cli.color.app(context.app) + " set to value \"" + context.args.new_value + "\"");
  });
}

module.exports = {
  topic: 'csv',
  command: 'update-index',
  description: 'Updates value stored under given index in CSV config variable',
  args: [{name: 'config_key'}, {name: 'index'}, {name: 'new_value'}],
  needsApp: true,
  needsAuth: true,
  run: cli.command(updateCommand)
};
