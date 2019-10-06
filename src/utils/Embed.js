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

        data.timestamp = data.timestamp ? new Date() : undefined;
        data.footer = data.footer !== undefined ? { text: data.footer } : undefined;
        data.color = data.color !== undefined ? data.color : Random.arrayElement(Configuration.defaultColours);

        super(data);
    }
}

module.exports = Embed;
