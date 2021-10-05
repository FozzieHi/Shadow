const Discord = require('discord.js');

class Message {
    constructor(content) {
        this.attachments = new Discord.Collection();
        this.author = {
            id: Discord.SnowflakeUtil.generate()
        };
        this.content = content;
        this.guild = null;
    }
}

module.exports = Message;
