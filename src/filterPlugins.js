function filterPlugins(plugins) {
    plugins = plugins.map(normalizePluginOptions);
    const exclude = getPluginsToExclude(plugins);
    plugins = plugins
        .map(normalizePluginName)
        .filter(plugin => !exclude.includes(plugin[0]));
    return plugins;
}

function getPluginsToExclude(plugins) {
    return plugins
    .filter(p => p[0].startsWith("!"))
    .map(p => p[0].substring(1));
}

function normalizePluginOptions(plugin) {
    if(plugin.length > 2 && typeof plugin[1] !== "object") {
        return [plugin, {}]
    }
    return plugin;
}

function normalizePluginName(plugin) {
    if(plugin[0].startsWith("!")) {
        return [plugin[0].substring(1), plugin[1]];
    }
    return plugin;
}

module.exports = filterPlugins;