'use strict';
const cli = require('heroku-cli-util');
const csv = require('./heroku-csv.js');

function addCommand(context, heroku) {
  const key = context.args.configKey;
  const app = heroku.apps(context.app);

  return csv.getConfigArray(app, key)
    .then((originalArr) => {
      const valueToAdd = context.args.valueToAdd;
      if (originalArr.indexOf(valueToAdd) >= 0) {
        cli.warn(`Config variable ${cli.color.cyan(key)} already contains ${valueToAdd}`);
      } else {
        const newArr = originalArr.concat([valueToAdd]);
        return csv.setConfigArray(app, key, newArr)
          .then(function() {
            cli.log(`Value ${valueToAdd} added to app ${cli.color.app(context.app)} under key ${cli.color.cyan(key)}`);
          });
      }
    });
}

module.exports = {
  topic: 'csv',
  command: 'add',
  description: 'Adds value to CSV config variable, if its not already there',
  args: [{name: 'configKey'}, {name: 'valueToAdd'}],
  needsApp: true,
  needsAuth: true,
  run: cli.command(addCommand)
};
