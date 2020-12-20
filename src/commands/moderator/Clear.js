const patron = require('patron.js');
const LoggingService = require('../../services/LoggingService.js');
const Configuration = require('../../utils/Configuration.js');

class Clear extends patron.Command {
    constructor() {
        super({
            names: ['clear', 'prune', 'clearchat', 'chatclear', 'purge'],
            groupName: 'moderator',
            description: 'Clear up to 200 messages in any text channel.',
            botPermissions: ['MANAGE_MESSAGES'],
            preconditions: ['clear'],
            args: [
                new patron.Argument({
                    name: 'messages to clear',
                    key: 'quantity',
                    type: 'float',
                    example: '5'
                }),
                new patron.Argument({
                    name: 'reason',
                    key: 'reason',
                    type: 'string',
                    example: 'Spamming.',
                    defaultValue: '',
                    remainder: true
                })
            ]
        });
    }

    async run(msg, args) {
        const messages = await msg.channel.messages.fetch({ limit: args.quantity + 1 });

        await msg.channel.bulkDelete(messages);

        const reply = await msg.sender.reply('Successfully cleared ' + args.quantity + (args.quantity === 1 ? ' message' : ' messages') + '.');

        await LoggingService.modLog(msg.dbGuild(), msg.guild, 'Clear', Configuration.orangeColour, args.reason, msg.author, null, 'Amount', args.quantity);

        return reply.delete(3000);
    }

}

module.exports = new Clear();
