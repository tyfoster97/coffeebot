const { save } = require('../utils/save');

const yml = process.env.EMOJI_LIST;

function isRole(message, str) {
    var role = message.guild.roles.cache.find(guild_role => guild_role.name.toLowerCase() == str.toLowerCase() );
    if (role) {
        return true;
    }
    return false;
}

module.exports.run = async (client, message, args, eroles) => {
    if (!message.guild.member(message.author).hasPermission('MANAGE_MEMBERS')) {
        //TODO: tell them they dont have permissions
        return;
    }
    //check args number
    if (args.length == 2) {
        var emoji = '';
        var role = '';
        //if first arg is emoji
        if (args[0].startsWith(':') && args[0].endsWith(':')) {
            emoji = agrs[0];
        } else {
            break;
        }

        //if second arg is role
        if (isRole(message, args[1])) {
            role = args[1];
        } else {
            break;
        }

        //add role and save file
        eroles[emoji] = role;
        save(client, message, yml, eroles);
        return;
    }
    //TODO: command help
};