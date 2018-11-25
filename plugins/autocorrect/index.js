var dictionary = require('dictionary-en-us');
var nspell = require('nspell');

async function autocorrect(options, { commit, branch }) {
    let { message } = commit;

    const nspellPromise = new Promise((resolve, reject) => {
        dictionary(function(err, dict) {
            if(err) {
                console.log(err);
                return;
            }
            const spell = nspell(dict);
            resolve(spell);
        })
    })

    const speller = await nspellPromise;
    if(speller) {
        const corrected = message.split(" ")
            .map(w => {
                if(!speller.correct(w)) {
                    return speller.suggest(w)[0];
                }
                return w;
            })
            .join(" ");
        commit.message = corrected;
        return commit;
    }
    return commit;
}

module.exports = autocorrect;