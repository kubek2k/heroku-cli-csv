'use strict';
const cli = require('heroku-cli-util');
const csv = require('./heroku-csv.js');

function listCommand(context, heroku) {
  const key = context.args.config_key;
  const app = heroku.apps(context.app);
  return csv.getConfigArray(app, key)
    .then(function(configValues) {
      cli.log("CSV values for " + cli.color.app(context.app) + " for key " + key);
      cli.table(configValues.map(
          function(v, idx) {
            return {index: idx.toString(), value: v};
          }), 
          { 
            columns: [
              {key: "index", label: "Idx"}, 
              {key: "value", label: "Value"}
            ]
          });
    });
}

module.exports = {
  topic: 'csv',
  command: 'list',
  description: 'Lists values in table for CSV config value',
  args: [{name: 'config_key'}],
  needsApp: true,
  needsAuth: true,
  default: true,
  run: cli.command(listCommand)
};
