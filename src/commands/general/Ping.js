const patron = require('patron.js');
const client = require('../../singletons/client.js');

class Ping extends patron.Command {
    constructor() {
        super({
            names: ['ping'],
            groupName: 'general',
            description: 'Get the bot\'s round trip time.',
            guildOnly: false
        });
    }

    async run(msg, args) {
        return msg.sender.reply('Pong!', { footer: `Round trip time: ${Date.now() - msg.createdTimestamp}ms` });
    }
}

module.exports = new Ping();
