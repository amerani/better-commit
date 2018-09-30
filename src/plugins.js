const fs = require("fs-jetpack");
const path = require("path");

const preset = [
    "prepend-branch"
]

async function getAsyncAdv() {
    const rcPath = path.resolve(process.cwd(), ".bettercommitrc");
    if(await fs.existsAsync(rcPath)) {
        const contents = await fs.readAsync(rcPath);
        const json = JSON.parse(contents);
        const exclude = json.plugins.filter(p => p.beginsWith("!")).map(p => p.splice(0,1));
        const include = [...json.plugins.filter(p => !p.beginsWith("!")), ...preset];
        return include.filter(p => exclude.includes(p));
    }
    return preset.map(normalize);
}

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

function get() {
    return new Promise((resolve, reject) => {
        const rcPath = path.resolve(process.cwd(), ".bettercommitrc");
        if(fs.existsSync(rcPath)) {
            fs.readFile(rcPath, { encoding: 'utf-8'}, (err, data) => {
                if(err) reject(err);
                const plugins = [...JSON.parse(data).plugins, ...preset].map(normalize);
                resolve(plugins);
            })
        }
        else {
            resolve(preset.map(normalize));
        }
    })
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
    get,
    getAsync
};