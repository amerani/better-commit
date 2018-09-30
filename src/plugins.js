const fs = require("fs-jetpack");
const path = require("path");

const preset = [
    "prepend-branch"
]

async function getAsync() {
    const rcPath = path.resolve(process.cwd(), ".bettercommitrc");
    if(await fs.existsAsync(rcPath)) {
        const contents = await fs.readAsync(rcPath);
        const json = JSON.parse(contents);
        const plugins = [...json.plugins, ...preset];
        return plugins.map(normalize);
    }
    return preset.map(normalize);
}

async function normalize(plugin) {
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