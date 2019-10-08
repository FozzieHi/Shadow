const patron = require('patron.js');
const db = require('../../database/index.js');
const StringUtils = require('../../utils/StringUtils.js');
const Configuration = require('../../utils/Configuration.js');

class History extends patron.Command {
    constructor() {
        super({
            names: ['history', 'hist', 'punishhistory', 'punhist', 'checkpuns', 'checkpunishments', 'checkpunish'],
            groupName: 'moderator',
            description: 'Check the previous punishments a user has.',
            args: [
                new patron.Argument({
                    name: 'user',
                    key: 'user',
                    type: 'user',
                    example: 'User#0000',
                    remainder: true
                })
            ]
        });
    }

    async run(msg, args) {
        const dbUser = await db.userRepo.getUser(args.user.id, msg.guild.id);
        const punishments = dbUser.punishments;

        if (punishments.length === 0) {
            return msg.sender.reply(StringUtils.boldify(args.user.tag) + ' has a clean slate.', {color: Configuration.greenColour});
        }

        await punishments.sort((a, b) => b.date - a.date);

        let fields = [];
        for (let i = 0; i < punishments.length; i++) {
            const punishment = punishments[i];
            fields.push(punishment.readableDate);
            fields.push(`**ID:** ${punishment.id}\n**Action:** ${punishment.action}\n**Moderator:** ${punishment.mod}\n` + (!StringUtils.isNullOrWhiteSpace(punishment.reason) ? `**Reason:** ${punishment.reason}` : '') + '\n\n');
        }

        const options = {
            title: args.user.tag + '\'s Punishment History',
            split: true
        };

        return msg.sender.sendFields(fields, options);
    }
}

module.exports = new History();
