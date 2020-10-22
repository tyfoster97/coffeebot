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

    if (llink != 'https://') {
        const msg = new MessageEmbed()
            .setTitle('Ty is live')
            .setDescription(str)
            .setURL(llink);
        client.channels.cahce.get(llog).send(msg);
    } else {
        const msg = new MessageEmbed()
            .setTitle('Ty is live')
            .setDescription(str);
        client.channels.cache.get(llog).send(msg);
    }
}