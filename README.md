Heroku CSV CLI plugin
=====================

Let's say you have lot of configuration variables in form: `SOME_VARIABLE=v1,v2,v3`. Those variables are horrible to mange.
To change its value from CLI you have to:
  * copy current value (`heroku config:get`)
  * append new value to the list
  * set new value (`heroku config:set`)

With this plugin its easy as:
```
heroku csv:add SOME_VARIABLE v4
```

For more options see [Usage](#usage).

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
