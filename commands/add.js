'use strict';
let cli = require('heroku-cli-util');
let csv = require('./heroku-csv.js');

module.exports = {
  topic: 'csv',
  command: 'add',
  description: 'Adds value to CSV config variable, if its not already there',
  args: [{name: 'config_key'}, {name: 'value_to_add'}],
  needsApp: true,
  needsAuth: true,
  run: cli.command(function(context, heroku) {
      var key = context.args.config_key;
      var app = heroku.apps(context.app);
      return csv.getConfigArray(app, key)
               .then(function(originalArr) {
                    var value_to_add = context.args.value_to_add; 
                    if (originalArr.indexOf(value_to_add) >= 0) {
                        cli.warn("Config variable " + cli.color.cyan(key) + " already contains \"" + value_to_add + "\"");
                    } else {
                        var newArr = originalArr.concat([value_to_add]);
                        return csv.setConfigArray(app, key, newArr)
                                   .then(function() { 
                                       cli.log("Value \"" + value_to_add + "\" added to app " + cli.color.app(context.app) + " under key " + cli.color.cyan(key));
                                   });
                    }
                });
  })
};
