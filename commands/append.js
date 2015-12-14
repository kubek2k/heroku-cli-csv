'use strict';
const cli = require('heroku-cli-util');
const csv = require('./heroku-csv.js');

function appendCommand(context, heroku) {
  const key = context.args.config_key;
  const app = heroku.apps(context.app);
  const value = context.args.value_to_append;
  return csv.getConfigArray(app, key)
    .then(function(originalArr) {
      var newArr = originalArr.concat([value]);
      return csv.setConfigArray(app, key, newArr);
    })
  .then(function() {
    cli.log("Value \"" + value + "\" appended to app " + cli.color.app(context.app) + " under key " + cli.color.cyan(key));
  });
}

module.exports = {
  topic: 'csv',
  command: 'append',
  description: 'Appends value to the end of CSV config variable',
  args: [{name: 'config_key'}, {name: 'value_to_append'}],
  needsApp: true,
  needsAuth: true,
  run: cli.command(appendCommand)
};
