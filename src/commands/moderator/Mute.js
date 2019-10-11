const patron = require('patron.js');
const db = require('../../database');
const Configuration = require('../../utils/Configuration.js');
const StringUtils = require('../../utils/StringUtils.js');
const NumericUtils = require('../../utils/NumericUtils.js');
const ModerationService = require('../../services/ModerationService');

class Mute extends patron.Command {
    constructor() {
        super({
            names: ['mute', 'silence'],
            groupName: 'moderator',
            description: 'Mute any user for a specified time, default is minutes.',
            botPermissions: ['MANAGE_ROLES'],
            args: [
                new patron.Argument({
                    name: 'member',
                    key: 'member',
                    type: 'member',
                    example: 'User#0000',
                    preconditions: ['nomoderator']
                }),
                new patron.Argument({
                    name: 'time',
                    key: 'time',
                    type: 'string',
                    example: '10m'
                }),
                new patron.Argument({
                    name: 'reason',
                    key: 'reason',
                    type: 'string',
                    example: 'Breaking rules.',
                    remainder: true
                })
            ]
        });
    }

    async run(msg, args) {
        const role = msg.guild.roles.get(msg.dbGuild.roles.muted);
        const time = args.time.toLowerCase();
        const timeNum = time.replace(/\D/g, '');
        let timeMS;
        let timeUnit;
        if (time.includes("h")) {
            timeMS = NumericUtils.hoursToMs(timeNum);
            timeUnit = 'hour';
        } else if (time.includes("m")) {
            timeMS = NumericUtils.minutesToMs(timeNum);
            timeUnit = 'minute';
        } else if (time.includes("d")) {
            timeMS = NumericUtils.daysToMs(timeNum);
            timeUnit = 'day';
        } else if (!isNaN(time)) {
            timeMS = NumericUtils.minutesToMs(timeNum);
            timeUnit = 'minute';
        } else {
            return msg.sender.reply('Invalid time format, formats: h (Hours), m (Minutes), d (Days).', { color: Configuration.errorColour });
        }

        if (msg.dbGuild.roles.muted === null) {
            return msg.sender.reply('Set a muted role with the `' + msg.dbGuild.prefix + 'settings` command before you can mute users.', { color: Configuration.errorColour });
        } else if (args.member.roles.has(msg.dbGuild.roles.muted)) {
            return msg.sender.reply(`${StringUtils.boldify(args.member.user.tag)} is already muted.`, { color: Configuration.errorColour });
        }

        if (role === undefined) {
            return msg.sender.reply('The muted role has been deleted. Please set a new one with the `' + msg.dbGuild.prefix + 'settings` command.', { color: Configuration.errorColour });
        }

        await args.member.roles.add(role);
        await db.muteRepo.insertMute(args.member.id, msg.guild.id, timeMS);
        await msg.sender.reply('Successfully muted ' + StringUtils.boldify(args.member.user.tag) + ' for ' + timeNum + ' ' + timeUnit + (parseInt(timeNum) !== 1 ? 's' : '') + '.');
        return ModerationService.submitPunishment(msg.guild, msg.dbGuild, 'Mute', args.member.user, msg.author, args.reason, msg.sender, 'Length', timeNum + ' ' + timeUnit);
    }
}

module.exports = new Mute();
