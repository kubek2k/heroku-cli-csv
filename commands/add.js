'use strict';
const cli = require('heroku-cli-util');
const csv = require('./heroku-csv.js');

function addCommand(context, heroku) {
  if(context.args.length < 2) {
    cli.error('At least two args required!');
    return;
  }

  const key = context.args[0];
  const values = context.args.slice(1);
  const app = heroku.apps(context.app);

  return csv.getConfigArray(app, key)
    .then((originalArr) => {
      const valuesToAdd = values.filter(v => originalArr.indexOf(v) < 0);
      if (valuesToAdd.length === 0) {
        cli.warn(`Config variable ${cli.color.cyan(key)} already contains all given values`);
        return;
      }
      for (let v of values.filter(v => originalArr.indexOf(v) >= 0)) {
        cli.warn(`Config variable ${cli.color.cyan(key)} already contains ${v}`);
      }
      const newArr = originalArr.concat(valuesToAdd);
      return csv.setConfigArray(app, key, newArr)
        .then(function() {
          cli.log(`Values ${valuesToAdd} added to app ${cli.color.app(context.app)} under key ${cli.color.cyan(key)}`);
        });
    });
}

module.exports = {
  topic: 'csv',
  command: 'add',
  description: 'Adds value(s) to CSV config variable, if its not already there',
  variableArgs: true,
  args: [{name: 'key'}, {name: 'values...'}],
  needsApp: true,
  needsAuth: true,
  run: cli.command(addCommand)
};
