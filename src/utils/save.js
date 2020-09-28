//imports
const fs = require('fs');
const yaml = require('js-yaml');
const { errorLog } = require('./log');
const yml = process.env.WORD_FILE;

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
function save(client, message, words) {
    try {
        let yamlStr = yaml.safeDump(words);
        fs.writeFile(yml, yamlStr, 'utf8');
    } catch (err) {
        errorLog(client, message, err);
    }
};

module.exports = {
    save
};