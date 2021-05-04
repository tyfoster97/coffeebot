//imports
const fs = require('fs');
const yaml = require('js-yaml');
const { errorLog } = require('./log');

/**
 * @author Ty Foster
 * @version 2020.09.27
 */

/**
 * Saves yaml file of banned words
 * @param {Client} client discord clinet
 * @param {Message} message discord message
 * @param {string[]} words words to ban from SFW chats
 */
function save(client, message, file, stuff) {
    try {
        let yamlStr = yaml.safeDump(words);
        fs.writeFile(file, yamlStr, 'utf8', (err) => console.log(err));
    } catch (err) {
        errorLog(client, message, err);
    }
};

module.exports = {
    save
};