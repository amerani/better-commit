const fs = require("fs-jetpack");
const path = require("path");
const filterPlugins = require("./filterPlugins");

const presets = ["prepend-branch", "autocorrect"]

async function getAsync() {
    const rcPath = path.resolve(process.cwd(), ".bettercommitrc");
    if(await fs.existsAsync(rcPath)) {
        const contents = await fs.readAsync(rcPath);
        const json = JSON.parse(contents);
        const plugins = filterPlugins([...presets, ...json.plugins]);
        const pluginMap = {};
        for(let i = 0; i < plugins.length; i++){
            const plugin = plugins[i];
            pluginMap[plugin[0]] = {
                path: await resolvePath(plugin[0]),
                options: plugin[1]
            }
        }
        return pluginMap;
    }
}

async function resolvePath(plugin) {
    const local = path.resolve(process.cwd(), plugin);
    if(await fs.existsAsync(`${local}.js`) || 
       await fs.existsAsync(local)) 
    {
        return local.toString();
    }
    const nmPath = path.resolve(process.cwd(), "node_modules", `better-commit-${plugin}`);
    return nmPath;
}

module.exports = {
    getAsync
};