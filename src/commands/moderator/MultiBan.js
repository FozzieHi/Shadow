const patron = require('patron.js');
const StringUtil = require('../../utils/StringUtils.js');
const ModerationService = require('../../services/ModerationService');

class MultiBan extends patron.Command {
    constructor() {
        super({
            names: ['multiban'],
            groupName: 'moderator',
            description: 'Ban multiple users, separate them with spaces.',
            botPermissions: ['BAN_MEMBERS'],
            args: [
                new patron.Argument({
                    name: 'users',
                    key: 'users',
                    type: 'user',
                    example: 'User#0000 User#0001 User#0002',
                    preconditions: ['nomoderator'],
                    infinite: true
                })
            ]
        });
    }

    async run(msg, args) {
        await args.users.forEach(user => {
            msg.guild.members.ban(user, { reason: `By ${msg.author.tag}` });
            ModerationService.submitPunishment(msg.guild, msg.dbGuild, 'Ban', 'banned', user, msg.author, '', msg.sender);
        });
        return msg.sender.reply(`Successfully multi-banned ${StringUtil.boldify(args.users.map(user => user.tag).join(", "))}.`);
    }
}

module.exports = new MultiBan();
