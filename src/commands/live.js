const { MessageEmbed } = require("discord.js");

const llog = process.env.LIVE_LOG;
const me = process.env.my_id;

module.exports.run = async (client, message, args) => {
    var str = 'See you there!';
    if (message.author.id != me) {
        str = 'They forgot to tell you, shame on them!';
    }

    var llink = 'https://';
    if (args[0]) {
        if (args[0] == 'twitch') {
            llink += 'twitch.tv/mother_of_wands';
        } else if (args[0] == 'tiktok') {
            llink += 'tiktok.com/@mother.of.wands';
        }
    }

    var msg;
    if (llink != 'https://') {
        msg = new MessageEmbed()
            .setTitle('Ty is live')
            .setDescription(str)
            .setURL(llink);
    } else {
        msg = new MessageEmbed()
            .setTitle('Ty is live')
            .setDescription(str);
    }
    client.channels.cache.find(ch => ch.id == llog).send(msg);
}