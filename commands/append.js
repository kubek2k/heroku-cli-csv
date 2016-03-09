'use strict';
const cli = require('heroku-cli-util');
const csv = require('./heroku-csv.js');

function appendCommand(context, heroku) {
  if(context.args.length < 2) {
    cli.error('At least two args required!');
    return;
  }
  const key = context.args[0];
  const values = context.args.slice(1);
  const app = heroku.apps(context.app);
  return csv.getConfigArray(app, key)
    .then(function(originalArr) {
      var newArr = originalArr.concat(values);
      return csv.setConfigArray(app, key, newArr);
    })
  .then(function() {
    cli.log(`Values ${values} appended to app ${cli.color.app(context.app)} under key ${cli.color.cyan(key)}`);
  });
}

module.exports = {
  topic: 'csv',
  command: 'append',
  description: 'Appends value(s) to the end of CSV config variable',
  variableArgs: true,
  args: [{name: 'key'}, {name: 'values...'}],
  needsApp: true,
  needsAuth: true,
  run: cli.command(appendCommand)
};
