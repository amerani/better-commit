function prepend({ commit, branch }) {
    let { message } = commit;
    const { name } = branch;

    message = name === null || name === "master" 
    ? message 
    : `${name}: ${message}`;

    return commit;
}

module.exports = prepend;