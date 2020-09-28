const { MessageEmbed } = require("discord.js");
/**
 * @author Ty Foster
 * @version 2020.09.27
 */

/**
 * Alerts member they do not have permission to do that
 * @param {Message} message message to reply to
 */
async function noPermission(message) {
    const msg = new MessageEmbed()
        .setTitle('Insufficient Permissions')
        .setDescription('You do not have permission to use that command');
    let m = await message.channel.send(msg);
    await m.delete({timeout: 10000}).catch(err => {
        console.log(err); //dont need to see this error
    });
}

module.exports = {
    noPermission
};