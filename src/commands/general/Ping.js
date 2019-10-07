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
        return msg.sender.reply('Pong!', { footer: `Round trip time: ${client.ws.ping.toFixed(2)}ms` });
    }
}

module.exports = new Ping();
