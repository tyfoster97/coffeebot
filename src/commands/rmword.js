const { MessageEmbed } = require("discord.js");
const { save } = require("../utils/save");
const { infoLog } = require('../utils/log');
//imports
/**
 * @author Ty Foster
 * @version 2020.09.27
 */

/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {string[]} args 
 * @param {string[]} words 
 */
module.exports.run = async (client, message, args, words) => {
    //if moderator
    if(message.guild.member(message.author).hasPermission('KICK_MEMBERS')) {
        //for each arg in args
        args.forEach(function (arg) {
            words = words.filter(function(ele) {
                return ele != arg;
            });
            save(client, message, words);
            const msg = new MessageEmbed()
                .setDescription('Removed ' + arg + ' from banned word list');
            message.channel.send(msg);
        });
        infoLog(client, message, 'words removed from banned list');
    }
};