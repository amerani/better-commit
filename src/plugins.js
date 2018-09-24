const fs = require("fs");
const path = require("path");

const preset = [
    "prepend-branch"
]

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

function normalize(plugin) {
    const local = path.resolve(process.cwd(), plugin);
    if(fs.existsSync(`${local}.js`) || fs.existsSync(local)) {
        return local.toString();
    }
    const nmPath = path.resolve(process.cwd(), "node_modules", `better-commit-${plugin}`);
    return nmPath;
}

module.exports = {
    get
};