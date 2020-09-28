const { MessageEmbed } = require("discord.js");

//import
const ilog = process.env.INFO_LOG;
const elog = process.env.ERR_LOG;

/**
 * Sends info message to log
 * @param {Client} client 
 * @param {Message} message 
 * @param {string} info 
 */
function infoLog(client, message, info) {
    const msg;
    if (message) {
        msg = new MessageEmbed()
            .setTitle('INFO')
            .setDescription(info)
            .addFields(
                { name: 'user', value: `${message.author.tag}` },
                { name: 'message', value: message.content }
            );
    } else {
        msg = new MessageEmbed()
            .setTitle('INFO')
            .setDescription(info);
    }
    client.channels.cache.get(ilog).send(msg);
};

/**
 * sends message to error log
 * @param {Client} client 
 * @param {Message} message 
 * @param {Error} err 
 */
function errorLog(client, message, err) {
    const msg;
    if (message) {
        msg = new MessageEmbed()
            .setTitle('ERROR')
            .setDescription(err.message)
            .addFields(
                { name: 'cause', value: message.content },
                { name: 'user', value: `${message.author.tag}` },
                { name: 'stacktrace', value: err.stack.toString() }
            );
    } else {
        msg = new MessageEmbed()
            .setTitle('ERROR')
            .setDescription(err.message)
            .addFields(
                { name: 'stacktrace', value: err.stack.toString() }
            );
    }
    client.channels.cache.get(elog).send(msg);
};

module.exports = {
    errorLog,
    infoLog
};