#!/usr/bin/env node
const { exec } =  require("child_process");
const { getAsync: getBranch } = require("./branch");
const { getAsync: getPlugins } = require("./plugins");
const { mode, DEV, PROD } = require("./mode");

(async function () {

    const args = [...process.argv];
    //remove 'node better-commit'
    args.splice(0,2);

    let command = `git commit ${args.join(" ")}`;
    
    //find -*m args (ex -am, -qam)
    const matchMessage = args.find(a => /^-.*m$/.test(a));
    const messageIndex = args.indexOf(matchMessage);
    
    if(messageIndex >= 0) {
        const rawMessage = args[messageIndex + 1];
    
        //remove -*m "<message>"
        args.splice(messageIndex, 2);

        const name = await getBranch();
        const seed = {
            commit: { message: rawMessage },
            branch: { name }
        };
        
        const plugins = await Promise.all(await getPlugins());
        
        if(mode === DEV) console.log(plugins)

        for(let i = 0; i < plugins.length; i++) {
            const plugin = plugins[i];
            const pluginModule = require(plugin);
            const { message } = await pluginModule(seed);
            seed.commit.message = message;
        }
        //build command        
        command = `git commit ${matchMessage} "${seed.commit.message}" ${args.join(" ")}`;
    }

    if(mode === DEV) {
        console.log(command);
    }
    else {
        exec(command, (error, stdout, stderr) => {
            if(error) { console.log(stdout); return;}
            if(stdout) { console.log(stdout); }
            if(stderr) { console.log(stderr); }
        });
    }
})()
.catch(console.log);