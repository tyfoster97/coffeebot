const { MessageEmbed } = require('discord.js');
//imports
const { save } = require('../utils/save');
const { infoLog } = require('../utils/log');

/**
 * @author Ty Foster
 * @version 2020.09.27
 */

/**
 * Adds word to banned list of words
 * @param {Client} client discord client
 * @param {Message} message discord message to reply to
 * @param {string[]} args words to add
 * @param {string[]} words current list of words
 */
module.exports.run = async (client, message, args, words) => {
    //for each argument
    args.forEach(function (arg) {
        //if word not already banned
        if (!words.includes(arg)) {
            //add to banned words
            words.concat(arg);
            save(client, message, words);
            //inform user
            const msg = new MessageEmbed()
                .setDescription('Added ' + arg + ' to banned words');
            message.channel.send(msg);
        }
    });
    infoLog(client, message, 'words added to banned list');
};