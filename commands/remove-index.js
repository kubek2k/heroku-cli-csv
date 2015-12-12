'use strict';
let cli = require('heroku-cli-util');
let csv = require('./heroku-csv.js');

module.exports = {
  topic: 'csv',
  command: 'remove-index',
  description: 'Removes value from CSV config that is stored under given index',
  help: 'help text for hello:world',
  args: [{name: 'config_key'}, {name: 'index'}],
  needsApp: true,
  needsAuth: true,
  run: cli.command(function(context, heroku) {
      var app = heroku.apps(context.app);
      var key = context.args.config_key;
      var index_to_remove = context.args.index;
      return csv.getConfigArray(app, key)
                .then(function(configArray) {
                    return csv.setConfigArray(app, key, configArray.filter(function (v, index) { return index != index_to_remove; }));
                })
                .then(function() {
                    cli.log("Value removed from index " + index_to_remove + " from app's " + cli.color.app(context.app) + " key " + cli.color.cyan(key));
                });
  })
};
