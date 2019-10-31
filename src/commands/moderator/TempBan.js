const patron = require('patron.js');
const db = require('../../database');
const StringUtil = require('../../utils/StringUtils.js');
const ModerationService = require('../../services/ModerationService');

class TempBan extends patron.Command {
    constructor() {
        super({
            names: ['tempban', 'temporaryban'],
            groupName: 'moderator',
            description: 'Temporarily ban a user.',
            botPermissions: ['BAN_MEMBERS'],
            args: [
                new patron.Argument({
                    name: 'user',
                    key: 'user',
                    type: 'user',
                    example: 'User#0000',
                    preconditions: ['nomoderator']
                }),
                new patron.Argument({
                    name: 'length',
                    key: 'length',
                    type: 'timelength',
                    example: '10m'
                }),
                new patron.Argument({
                    name: 'reason',
                    key: 'reason',
                    type: 'string',
                    example: 'Breaking the rules.',
                    defaultValue: '',
                    remainder: true
                })
            ]
        });
    }

    async run(msg, args) {
        await db.banRepo.insertBan(args.user.id, msg.guild.id, args.length.ms);
        await msg.guild.members.ban(args.user, { reason: `(${msg.author.tag}) ${args.reason}` });
        await msg.sender.reply(`Successfully banned ${StringUtil.boldify(args.user.tag)} for ${args.time.num} ${args.time.unit}.`);
        return ModerationService.submitPunishment(msg.guild, msg.dbGuild, 'Temporary Ban', args.user, msg.author, args.reason, msg.sender, 'Length', args.length.num + ' ' + args.length.unit);
    }
}

module.exports = new TempBan();
