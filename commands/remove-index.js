'use strict';
const cli = require('heroku-cli-util');
const csv = require('./heroku-csv.js');

function removeIndexCommand(context, heroku) {
  const app = heroku.apps(context.app);
  const key = context.args.config_key;
  const indexToRemove = context.args.index;
  return csv.getConfigArray(app, key)
    .then(function(configArray) {
      return csv.setConfigArray(app, key, configArray.filter(function (v, index) { return index != indexToRemove; }));
    })
  .then(function() {
    cli.log("Value removed from index " + indexToRemove + " from app's " + cli.color.app(context.app) + " key " + cli.color.cyan(key));
  });
}

module.exports = {
  topic: 'csv',
  command: 'remove-index',
  description: 'Removes value from CSV config that is stored under given index',
  args: [{name: 'config_key'}, {name: 'index'}],
  needsApp: true,
  needsAuth: true,
  run: cli.command(removeIndexCommand)
};
