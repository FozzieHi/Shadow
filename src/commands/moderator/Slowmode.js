const patron = require('patron.js');
const LoggingService = require('../../services/LoggingService.js');
const Configuration = require('../../utils/Configuration.js');

class Slowmode extends patron.Command {
    constructor() {
        super({
            names: ['slowmode', 'slow'],
            groupName: 'moderator',
            description: 'Enable slowmode with a set amount of seconds between each message.',
            args: [
                new patron.Argument({
                    name: 'seconds',
                    key: 'seconds',
                    type: 'string',
                    example: '5'
                })
            ]
        });
    }

    async run(msg, args) {
        if (args.seconds === 'off' || args.seconds === 'disable' || args.seconds === '0') {
            await msg.channel.edit({ rateLimitPerUser: 0 }, 'Slowmode Disabled by ' + msg.author.tag);
            await msg.sender.reply('Successfully disabled slowmode in ' + msg.channel + '.');
            return LoggingService.log(msg.dbGuild, msg.guild, Configuration.lightOrangeColour, msg.author, 'Disabled slowmode in ' + msg.channel.toString() + '.');
        } else if (!isNaN(args.seconds)) {
            const seconds = parseInt(args.seconds);
            await msg.channel.edit({ rateLimitPerUser: seconds }, 'Slowmode enabled by ' + msg.author.tag);
            await msg.sender.reply('Successfully enabled slowmode in ' + msg.channel + ' for ' + args.seconds + ' seconds.');
            return LoggingService.log(msg.dbGuild, msg.guild, Configuration.lightOrangeColour, msg.author, 'Enabled slowmode in ' + msg.channel.toString() + ' for ' + args.seconds + ' seconds.');
        } else {
            return msg.sender.reply('You must specify a valid number.', { color: Configuration.errorColour });
        }
    }
}

module.exports = new Slowmode();
