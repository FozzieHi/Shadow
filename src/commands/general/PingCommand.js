const patron = require('patron.js');
const client = require('../../singletons/client.js');
const Sender = require('../../utils/Sender.js');

class PingCommand extends patron.Command {
    constructor() {
        super({
            names: ['ping'],
            groupName: 'general',
            description: 'Get the bot\'s round trip time.'
        });
    }

    async run(msg, args) {
        const sender = new Sender(msg);
        return sender.reply('Pong!', { footer: `Round trip time: ${client.ping}ms` });
    }
}

module.exports = new PingCommand();
