const randomEmoji = require("random-emoji");

function emojify(options, { commit, /*branch*/ }) {
    let { message } = commit;
    if(options.toLowerCase() === "random") {
        const emoji = randomEmoji.random({count:1});
        commit.message = `${message} ${emoji[0].character}`
    }
    else if(options) {
        commit.message = `${message} ${options}`
    }
    return commit;
}

module.exports = emojify;