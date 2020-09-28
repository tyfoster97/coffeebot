const { infoLog } = require("./log");
const nsfw = process.env.NSFW_CAT;
const admin = process.env.ADMIN_CAT;

/**
 * @author Ty Foster
 * @version 2020.09.27
 */

/**
 * Filters banned words from server
 * @param {Client} client discord client
 * @param {Message} message discord message to check
 * @param {string[]} words word list to compare against
 */
function filter(client, message, words) {
    words.forEach(async function (word) {
        if (message.channel.parentID != nsfw && message.channel.parentID != admin) {
            if (message.content.toLowerCase().includes(word)) {
                //alert admins
                infoLog(client, message, 'banned word used');
                //delete message
                await message.delete().catch(err => console.log(err));
                //quit
                return;
            }
        }
    })
};

module.exports = {
    filter
};