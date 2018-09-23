const fs = require("fs");
const path = require("path");

function get() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(process.cwd(), ".git", "HEAD"), { encoding: 'utf-8'}, (err, data) => {
            if(err) reject(err);
            const branch = parse(data);
            if(branch) resolve(branch);
            else resolve(null);
        })
    })
}

function parse(head) {
    const refMatch = head.match(/^ref: refs\/heads\/(.+)/);
    if(refMatch) return refMatch[1];
    return null;
}

module.exports = {
    get,
    parse
};