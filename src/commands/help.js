const { MessageEmbed } = require("discord.js");
const { noPermission } = require("../utils/errmsg");
/**
 * Help info message functions
 * @author Ty Foster
 * @version 2020.09.27
 */

/**
 * @param {Client} client discord client
 * @param {Message} message discord message
 * @param {string[]} args command line args
 * @param {string[]} words doesnt matter in this function
 */
module.exports.run = async (client, message, args, words) => {
    //if command help
    if (args[0]) {
        if (args[0] == 'addword') {
            addword(message);
            return;
        } else if (args[0] == 'rmword') {
            rmword(message);
            return;
        } else if (args[0] == 'list') {
            list(message);
            return;
        } else if (args[0] == 'addrole') {
            addrole(message);
            return;
        } else if (args[0] == 'rmrole') {
            rmrole(message);
            return;
        } else if (args[0] == 'assign') {
            assign(message);
            return;
        } else if (args[0] == 'live') {
            live(message);
            return;
        }
    }
    help(message);
};

/**
 * General help command
 * @param {Message} message message to reply to
 */
function help(message) {
    const msg = new MessageEmbed()
        .setTitle('Commands')
        .setDescription('use !help <command> for more details')
        .addFields(
            { name: 'addword', value: 'adds a word to banned word list (everyone)' },
            { name: 'rmword', value: 'removes a word form banned word list (mods)' },
            { name: 'list', value: 'lists all banned words' }
        );
    message.channel.send(msg);
};

/**
 * addword help command
 * @param {Message} message message to reply to
 */
function addword(message) {
    const msg = new MessageEmbed()
        .setTitle('addword')
        .setDescription('Adds a word to the banned word list')
        .addFields(
            { name: 'Users', value: 'anyone can use this command' },
            { name: 'Format', value: '!addword <word> [<word> ... <word>]'} ,
            { name: 'Example', value: '!addword penis\n!addword penis vagina watermelon' }
        );
    message.channel.send(msg);
};

/**
 * rmword help command
 * @param {Message} message message to reply to
 */
function rmword(message) {
    if (message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
        const msg = new MessageEmbed()
            .setTitle('rmword')
            .setDescription('Removes a word from the banned word list')
            .addFields(
                { name: 'Users', value: 'mods and admins can use this command' },
                { name: 'Format', value: '!rmword <word> [<word> ... <word>]' },
                { name: 'Example', value: '!rmword yellow\n!rmword yellow red us' }
            );
        message.channel.send(msg);
    } else {
        noPermission(message);
    }
};

/**
 * list help command
 * @param {Message} message message to reply to 
 */
function list(message) {
    const msg = new MessageEmbed()
        .setTitle('list')
        .setDescription('Lists all banned words')
        .addFields(
            { name: 'Users', value: 'anyone can use this command' },
            { name: 'Format', value: '!list'} 
        );
    message.channel.send(msg);
};


function addrole(message) {
    //TODO
}

function rmrole(message) {
    //TODO
}

function assign(message) {
    //TODO
}
function live(message) {
    const msg = new MessageEmbed()
        .setTitle('live')
        .setDescription('Notify everyone that Ty is live')
        .addFields(
            { name: 'Users', value: 'anyone can use this command' },
            { name: 'Format', value: '!live [place]' },
            { name: 'Example', value: '!live \n!live twitch \n!live tiktok'}
        );
    message.channel.send(msg);
}