'use strict';
const cli = require('heroku-cli-util');
const csv = require('./heroku-csv.js');

function removeCommand(context, heroku) {
  const app = heroku.apps(context.app);
  const key = context.args.config_key;
  const toRemove = context.args.value_to_remove;
  return csv.getConfigArray(app, key)
    .then(function(configArray) {
        const nonMatching = configArray.filter(function(v) { return v !== toRemove; });
        if (nonMatching.length == configArray.length) {
            throw new Error('Value ' + toRemove + ' not in the array under the key ' + key);
        }
        return nonMatching;
    })
    .then(function(filteredArray) {
      return csv.setConfigArray(app, key, filteredArray);
    })
  .then(function() {
    cli.log("Value \"" + toRemove + "\" removed from app's " + cli.color.app(context.app) + " key " + cli.color.cyan(key));
  });
}

module.exports = {
  topic: 'csv',
  command: 'remove',
  description: 'Removes value from CSV config',
  args: [{name: 'config_key'}, {name: 'value_to_remove'}],
  needsApp: true,
  needsAuth: true,
  run: cli.command(removeCommand)
};
