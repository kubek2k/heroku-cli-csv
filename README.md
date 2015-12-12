Heroku CSV CLI plugin
=====================

A plugin to Heroku CLI, that simplifies the management of config values in a form of CSV.

## Installation

```
heroku plugins:install heroku-cli-csv
```

## Usage

  * `heroku csv:list KEY` - list values stored under KEY in table format 
  * `heroku csv:add KEY VALUE` - add value to CSV under KEY if not there already
  * `heroku csv:remove KEY VALUE` - remove VALUE (all instances) from CSV under KEY
  * `heroku csv:append KEY VALUE` - add VALUE to CSV stored under KEY
  * `heroku csv:update-index KEY INDEX VALUE` - exchange value stored in CSV under KEY under INDEX with VALUE
  * `heroku csv:remove-index KEY INDEX` - remove value stored in CSV under KEY under INDEX
