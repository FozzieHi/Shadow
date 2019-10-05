const discord = require('discord.js');
const Random = require('./Random.js');
const Configuration = require('./Configuration.js');

class Embed extends discord.MessageEmbed {
    constructor(data) {
        if (data.fields !== undefined) {
            const inline = data.inline !== undefined ? data.inline : false;

            for (let i = 0; i < data.fields.length; i++) {
                data.fields[i].inline = inline;
            }
        }

        data.author = data.author !== undefined ? { name: data.author.name, icon_url: data.author.icon, url: data.author.url } : undefined;
        data.timestamp = data.timestamp === true ? new Date() : undefined;
        data.footer = data.footer !== undefined ? { text: data.footer } : undefined;
        data.color = data.color !== undefined ? data.color : Random.arrayElement(Configuration.defaultColours);

        super(data);
    }
}

module.exports = Embed;
