const patron = require('patron.js');
const StringUtil = require('../../utils/StringUtils.js');
const ModerationService = require('../../services/ModerationService');

class Kick extends patron.Command {
    constructor() {
        super({
            names: ['kick'],
            groupName: 'moderator',
            description: 'Kick a member.',
            args: [
                new patron.Argument({
                    name: 'member',
                    key: 'member',
                    type: 'member',
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
        await ModerationService.submitPunishment(msg.guild, msg.dbGuild, 'Kick', args.member.user, msg.author, args.reason, msg.sender);
        await args.member.kick();
        return msg.sender.reply(`Successfully kicked ${StringUtil.boldify(args.member.user.tag)}.`);
    }
}

module.exports = new Kick();