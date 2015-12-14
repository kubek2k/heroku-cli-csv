'use strict';

module.exports = {
  getConfigArray: function(app, key) {
    return app.configVars().info()
      .then(function(config) {
        if (!(key in config)) {
          return [];
        }
        return config[key].split(',').filter((s) => s !== '');
      });
  },
  setConfigArray: function(app, key, arr) {
    const val = arr.join(',');
    const configPatch = {};
    configPatch[key] = val;
    return app.configVars().update(configPatch);
  }
};
