#!/usr/bin/env node
const { exec } =  require('child_process');

let command;
const args = [...process.argv];
//remove 'node better-commit'
args.splice(0,2);

const messageIndex = args.indexOf("-m");

if(messageIndex >= 0) {
    const rawMessage = args[messageIndex + 1];
    //remove -m "<message>"
    args.splice(messageIndex, 2);
    
    //TODO: manipulate message

    //build command
    command = `git commit -m "${rawMessage}" ${args.join(" ")}`;
}
else {
    command = `git commit ${args.join(" ")}`;
}

exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return;
    }
    if(stdout) { console.log(stdout); return; }
    if(stderr) { console.log(stderr); return; }
});