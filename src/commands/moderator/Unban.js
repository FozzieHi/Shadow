const patron = require('patron.js');
const StringUtils = require('../../utils/StringUtils.js');
const Configuration = require('../../utils/Configuration.js');
const LoggingService = require('../../services/LoggingService.js');
const Try = require('../../utils/Try.js');

class Unban extends patron.Command {
    constructor() {
        super({
            names: ['unban'],
            groupName: 'moderator',
            description: 'Unban a user.',
            botPermissions: ['BAN_MEMBERS'],
            args: [
                new patron.Argument({
                    name: 'user',
                    key: 'user',
                    type: 'banneduser',
                    example: 'User#0000'
                }),
                new patron.Argument({
                    name: 'reason',
                    key: 'reason',
                    type: 'string',
                    example: 'Forgiven <3.',
                    defaultValue: '',
                    remainder: true
                })
            ]
        });
    }

    async run(msg, args) {
        await msg.sender.reply('Successfully unbanned ' + StringUtils.boldify(args.user.tag) + '.');
        await msg.guild.members.unban(args.user);
        await LoggingService.modLog(msg.dbGuild, msg.guild, 'Unban', Configuration.greenColour, args.reason, msg.author, args.user);
        return Try(msg.sender.dm('A moderator has unbanned you' + (StringUtils.isNullOrWhiteSpace(args.reason) ? '.' : ' for the reason: ' + args.reason + '.'), {}, args.user));
    }
}

module.exports = new Unban();
