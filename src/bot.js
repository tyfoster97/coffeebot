//imports
require('dotenv').config();
const discord = require('discord.js');
const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');
const { infoLog, errorLog } = require('./utils/log');
const yml = process.env.WORD_FILE;

/**
 * Main file for running moderator bot
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
            registerWords();
        } else {
            //do nothing
        }
    } else {
        //client.commands.get('filter').run(client, message, null);
    }

    client.on('error', function(error) {
        errorLog(client, message, error);
    });

    process.on('uncaughtException', function(error) {
        errorLog(client, message, error);
    });

    process.on('unhandledRejection', function(reason, promise) {
        errorLog(client, message, error);
    });
});

/**
 * sets up bot stuff
 */
(async function load() {
    await registerCommands('commands');
    await registerWords();
})();

/**
 * Loads commands for bot
 * @param {string} dir 
 */
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
            }
        }
    }
};

/**
 * Loads banned wordlist
 */
async function registerWords() {
    try {
        let contents = await fs.readFile(yml, 'utf8');
        words = yaml.safeLoad(contents, yaml.FAILSAFE_SCHEMA);
    } catch(err) {
        if (client) {
            errorLog(client, null, err);
        } else {
            console.log(err);
        }
    }
};



