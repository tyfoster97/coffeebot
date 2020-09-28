const { MessageEmbed } = require("discord.js");
/**
 * @author Ty Foster
 * @version 2020.09.27
 */


/**
 * @param {Client} client not needed
 * @param {Message} message message to respond to
 * @param {string[]} args not needed
 * @param {string[]} words list of banned words
 */
module.exports.run = async (client, message, args, words) => {
    var list = '';
    if (words) { 
        words.forEach(function(word) {
            list = list + word + '\n';
        });
    }
    const msg = new MessageEmbed()
        .setTitle('Banned words')
        .setDescription(list);
    message.channel.send(msg);
};