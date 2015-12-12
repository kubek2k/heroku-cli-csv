'use strict';
let cli = require('heroku-cli-util');
let csv = require('./heroku-csv.js');

module.exports = {
  topic: 'csv',
  command: 'remove',
  description: 'Removes value from CSV config',
  help: 'help text for hello:world',
  args: [{name: 'config_key'}, {name: 'value_to_remove'}],
  needsApp: true,
  needsAuth: true,
  run: cli.command(function(context, heroku) {
      var app = heroku.apps(context.app);
      var key = context.args.config_key;
      var to_remove = context.args.value_to_remove;
      return csv.getConfigArray(app, key)
                .then(function(configArray) {
                    return csv.setConfigArray(app, key, configArray.filter(function (v) { return v != to_remove; }));
                })
                .then(function() {
                    cli.log("Value \"" + to_remove + "\" removed from app's " + cli.color.app(context.app) + " key " + cli.color.cyan(key));
                });
  })
};
