const patron = require('patron.js');
const Configuration = require('../../utils/Configuration.js');
const LoggingService = require('../../services/LoggingService.js');
const StringUtils = require('../../utils/StringUtils.js');
const db = require('../../database');

class Unmute extends patron.Command {
    constructor() {
        super({
            names: ['unmute'],
            groupName: 'moderator',
            description: 'Unmute any member.',
            botPermissions: ['MANAGE_ROLES'],
            args: [
                new patron.Argument({
                    name: 'member',
                    key: 'member',
                    type: 'member',
                    example: 'Paul#3091'
                }),
                new patron.Argument({
                    name: 'reason',
                    key: 'reason',
                    type: 'string',
                    defaultValue: '',
                    example: 'Forgiven <3.',
                    remainder: true
                })
            ]
        });
    }

    async run(msg, args) {
        if (msg.dbGuild.roles.muted === null) {
            return msg.sender.reply('Set a muted role with the `' + msg.dbGuild.prefix + 'settings` command before you can unmute users.', { color: Configuration.errorColour });
        } else if (!args.member.roles.has(msg.dbGuild.roles.muted)) {
            return msg.sender.reply(`${StringUtils.boldify(args.member.user.tag)} is not muted.`, { color: Configuration.errorColour });
        }

        const role = msg.guild.roles.cache.get(msg.dbGuild.roles.muted);

        if (role === undefined) {
            return msg.sender.reply('The muted role has been deleted. Please set a new one with the `' + msg.dbGuild.prefix + 'settings` command.', { color: Configuration.errorColour });
        }

        await args.member.roles.remove(role);
        await db.muteRepo.deleteMute(args.member.user.id, msg.guild.id);
        await msg.sender.reply('Successfully unmuted ' + StringUtils.boldify(args.member.user.tag) + '.');
        await msg.sender.dm('A moderator has unmuted you' + (StringUtils.isNullOrWhiteSpace(args.reason) ? '.' : ' for the reason: ' + args.reason + '.'), {}, args.member.user);
        return LoggingService.modLog(msg.dbGuild, msg.guild, 'Unmute', Configuration.greenColour, args.reason, msg.author, args.member.user);
    }
}

module.exports = new Unmute();
