function emojify({ commit, /*branch*/ }, options) {
    let { message } = commit;
    if(options) {
        commit.message = `${message} ${options}`
    }
    return commit;
}

module.exports = emojify;