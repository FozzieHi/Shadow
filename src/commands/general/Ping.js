const patron = require('patron.js');
const client = require('../../singletons/client.js');

class Ping extends patron.Command {
    constructor() {
        super({
            names: ['ping'],
            groupName: 'general',
            description: 'Get the bot\'s round trip time.'
        });
    }

    async run(msg, args) {
        return msg.sender.reply('Pong!', { footer: `Round trip time: ${client.ws.ping}ms` });
    }
}

module.exports = new Ping();
