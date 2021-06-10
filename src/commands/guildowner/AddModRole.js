const db = require('../../database/index.js');
const patron = require('patron.js');
const Configuration = require('../../utils/Configuration.js');

class AddModRole extends patron.Command {
    constructor() {
        super({
            names: ['addmodrole', 'addmod', 'setmod'],
            groupName: 'guildowner',
            description: 'Add a moderation role.',
            args: [
                new patron.Argument({
                    name: 'role',
                    key: 'role',
                    type: 'role',
                    example: 'Moderator'
                }),
                new patron.Argument({
                    name: 'permissionLevel',
                    key: 'permissionLevel',
                    type: 'float',
                    example: '1',
                    default: 1
                })
            ]
        });
    }

    async run(msg, args) {
        if (args.permissionLevel < 1 || args.permissionLevel > 3) {
            return msg.sender.reply('**Permission levels:**\n**1)** Moderator\n**2)** Administrator\n**3)** Server Owner', { color: Configuration.errorColour });
        } else if (msg.dbGuild.roles.mod.some((role) => role.id === args.role.id)) {
            return msg.sender.reply('The moderation role has already been set.', { color: Configuration.errorColour });
        }

        await db.guildRepo.upsertGuild(msg.guild.id, new db.updates.Push('roles.mod', { id: args.role.id, permissionLevel: args.permissionLevel }));

        return msg.sender.reply('Successfully added the moderation role ' + args.role.toString() + ' with a level of ' + args.permissionLevel + '.');
    }
}

module.exports = new AddModRole();
