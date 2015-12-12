'use strict';
let cli = require('heroku-cli-util');
let csv = require('./heroku-csv.js');

module.exports = {
  topic: 'csv',
  command: 'update-index',
  description: 'Updates value stored under given index in CSV config variable',
  help: 'help text for hello:world',
  args: [{name: 'config_key'}, {name: 'index'}, {name: 'new_value'}],
  needsApp: true,
  needsAuth: true,
  run: cli.command(function(context, heroku) {
      var app = heroku.apps(context.app);
      var key = context.args.config_key;
      var index_to_update = context.args.index;
      return csv.getConfigArray(app, key)
                .then(function(configArray) {
                    return csv.setConfigArray(app, key, configArray.map(function (v, index) { 
                        if (index == index_to_update) {
                            return context.args.new_value;
                        }
                        return v;
                    }));
                })
                .then(function() {
                    cli.log("Value under index " + index_to_update + " under key " + cli.color.cyan(key) + " for app " + cli.color.app(context.app) + " set to value \"" + context.args.new_value + "\"");
                });
  })
};
