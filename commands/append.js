'use strict';
let cli = require('heroku-cli-util');
let csv = require('./heroku-csv.js');

module.exports = {
  topic: 'csv',
  command: 'append',
  description: 'Appends value to the end of CSV config variable',
  help: 'help text for hello:world',
  args: [{name: 'config_key'}, {name: 'value_to_append'}],
  needsApp: true,
  needsAuth: true,
  run: cli.command(function(context, heroku) {
      var key = context.args.config_key;
      var app = heroku.apps(context.app);
      return csv.getConfigArray(app, key)
               .then(function(originalArr) {
                    var newArr = originalArr.concat([context.args.value_to_append]);
                    return csv.setConfigArray(app, key, newArr);
                })
                .then(function() {
                    cli.log("Value appended");
                });
  })
};
