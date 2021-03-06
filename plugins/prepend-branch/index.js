function prepend(options, { commit, branch }) {
    let { message } = commit;
    const { name } = branch;
    if(name === "master" && options.master) {
        commit.message = `${options.master}: ${message}`
    }
    else if(name !== null) {
        commit.message = `${name}: ${message}`;
    }
    return commit;
}

module.exports = prepend;