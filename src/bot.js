//imports
require('dotenv').config();
const discord = require('discord.js');
const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');
/**
 * @summary Main file for running moderator bot
 * @author Ty Foster
 * @version 2020.09.27
 */
const client = new discord.Client();

const prefix = process.env.PREFIX;
client.login(process.env.TOKEN);

client.commands = new Map();
var words = []; //array of censored words

client.on('ready', () => {
    //print to infoLog -> logged on
})

const isCmd = message => message.content.startsWith(prefix);

client.on('message', function(message) {
    if (message.author.bot) return;

    if (isCmd(message)) {
        cmdArgs = message.content.toLowerCase().substring(message.content.indexOf(prefix)+1).split(new RegExp(/[\s+,+\-+]/));
        let cmd = cmdArgs.shift();
        if (client.commands.get(cmd)) {
            client.command.get(cmd).run(client, message, cmdArgs, words);
        } else {
            //do nothing
        }
    } else {
        //client.commands.get('filter').run(client, message, null);
    }

    client.on('error', function(error) {
        //log
        //inform
    });

    process.on('uncaughtException', function(error) {
        //log
        //inform
    });

    process.on('unhandledRejection', function(reason, promise) {
        //log
        //inform
    });
});

(async function load() {
    await registerCommands('commands');
    await registerWords('./filtered.yml');
})();

async function registerCommands(dir = 'commands') {
    let files = await fs.readdir(path.join(__dirname, dir));
    console.log(files);
    //loop through files
    for (let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        //if stat is a directory
        if (stat.isDirectory()) {
            //recursive method call
            registerCommands(path.join(dir, file));
        } else {
            //if the file is a js file
            if (file.endsWith(".js")) {
                //get command name
                let cmdName = file.substring(0, file.indexOf(".js"));
                //get command module
                let cmdModule = require(path.join(__dirname, dir, file));
                //map command names to modules
                client.commands.set(cmdName, cmdModule);
                //log that command was loaded
            }
        }
    }
};

async function registerWords(name = './filtered.yml') {
    try {
        let contents = await fs.readFile(name, 'utf8');
        words = yaml.safeLoad(contents, yaml.FAILSAFE_SCHEMA);
    } catch(err) {
        //log
    }
};



