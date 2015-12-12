module.exports = {
    getConfigArray: function(app, key) {
                        return app.configVars().info()
                            .then(function(config) {
                            if (!(key in config)) {
                                return [];
                            }
                            return config[key].split(",").filter(function (s) { return s != ""; });
                    });
    },
    setConfigArray: function(app, key, arr) {
                        var val = arr.join(",");
                        var configPatch = {};
                        configPatch[key] = val;
                        return app.configVars().update(configPatch);
                    }
}

