#!/usr/bin/env node
const { exec } =  require("child_process");
const { get: getBranch } = require("./branch");
// const prepend = require("./prepend");
const plugins = require("./plugins");
const path = require("path");

let commandPromise;
const args = [...process.argv];
//remove 'node better-commit'
args.splice(0,2);

//find -*m args (ex -am, -qam)
const matchMessage = args.find(a => /^-.*m$/.test(a));
const messageIndex = args.indexOf(matchMessage);

if(messageIndex >= 0) {
    const rawMessage = args[messageIndex + 1];

    //remove -*m "<message>"
    args.splice(messageIndex, 2);
    
    commandPromise = getBranch()
    .then(name => {
        const seed = {
            commit: { message: rawMessage },
            branch: { name }
        };
        return plugins.get()
        .then(plugins => {
            for(let i = 0; i < plugins.length; i++) {
                const plugin = plugins[i];
                const pluginModule = require(plugin);
                const { message } = pluginModule(seed);
                seed.commit.message = message;
            }
            //build command        
            return `git commit ${matchMessage} "${seed.commit.message}" ${args.join(" ")}`;
        });
    });
}
else {
    commandPromise = Promise.resolve(`git commit ${args.join(" ")}`);
}

commandPromise
.then(command => {
    console.log(command)
    exec(command, (error, stdout, stderr) => {
        if(error) { console.log(stdout); }
        if(stdout) { console.log(stdout); }
        if(stderr) { console.log(stderr); }
    });
})
.catch(console.log)
