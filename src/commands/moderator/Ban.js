const patron = require('patron.js');
const StringUtil = require('../../utils/StringUtils.js');
const ModerationService = require('../../services/ModerationService');

class Ban extends patron.Command {
    constructor() {
        super({
            names: ['ban'],
            groupName: 'moderator',
            description: 'Ban a user.',
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
        await msg.guild.members.ban(args.user, { reason: `(${msg.author.tag}) ${args.reason}` });
        await msg.sender.reply(`Successfully banned ${StringUtil.boldify(args.user.tag)}.`);
        return ModerationService.submitPunishment(msg.guild, msg.dbGuild, 'Ban', args.user, msg.author, args.reason, msg.sender);
    }
}

module.exports = new Ban();
