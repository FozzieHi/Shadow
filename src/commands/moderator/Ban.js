const patron = require('patron.js');
const StringUtil = require('../../utils/StringUtils.js');
const ModerationService = require("../../services/ModerationService");

class Ban extends patron.Command {
    constructor() {
        super({
            names: ['ban'],
            groupName: 'moderator',
            description: 'Ban a user.',
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
        await ModerationService.submitPunishment(msg.guild, msg.dbGuild, 'Ban', args.member.user, msg.author, args.reason, msg.sender);
        await msg.guild.ban(args.user);
        return msg.sender.reply(`Successfully banned ${StringUtil.boldify(args.member.user.tag)}.`);
    }
}

module.exports = new Ban();
