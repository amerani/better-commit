const fs = require("fs-jetpack");
const path = require("path");

async function getAsync() {
    const contents = await fs.readAsync(path.resolve(process.cwd(), ".git", "HEAD"));
    const branch = parse(contents);
    if(branch) return branch;
    return null;
}

function parse(head) {
    const refMatch = head.match(/^ref: refs\/heads\/(.+)/);
    if(refMatch) return refMatch[1];
    return null;
}

module.exports = {
    getAsync,
    parse
};