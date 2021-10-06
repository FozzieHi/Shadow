const Discord = require('discord.js');

class Message {
    constructor(content) {
        this.attachments = new Discord.Collection();
        this.author = {
            id: Discord.SnowflakeUtil.generate()
        };
        this.content = content;
        this.guild = {
            channels: {
                cache: {
                    get: jest.fn()
                },
            },
            fetchAuditLogs: jest.fn()
        };
        this.type = 'DEFAULT';
    }
}

module.exports = Message;
