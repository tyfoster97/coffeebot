//imports
const fs = require('fs');
const yaml = require('js-yaml');
const path = process.env.PATH;

/**
 * @summary save function for writing filtered.yml after edit
 * @author Ty Foster
 * @version 2020.09.27
 */

/**
 * Saves yaml file of banned words
 * @param {string} path path to yaml file
 * @param {string[]} words words to ban from SFW chats
 */
function save(words) {
    try {
        let yamlStr = yaml.safeDump(words);
        fs.writeFile(path, yamlStr, 'utf8');
    } catch (err) {
        //log
    }
}