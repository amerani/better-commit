const fs = require("fs");
const path = require("path");

function get() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(process.cwd(), ".bettercommitrc"), { encoding: 'utf-8'}, (err, data) => {
            if(err) reject(err);
            const plugins = JSON.parse(data).plugins.map(plugin => {
                const local = path.resolve(process.cwd(), plugin);
                if(fs.existsSync(`${local}.js`) || fs.existsSync(local)) {
                    return local.toString();
                }
                return `better-commit-${plugin}`;
            });
            resolve(plugins);
        })
    })
}

module.exports = {
    get
};