const patron = require('patron.js');
const Configuration = require('../../utils/Configuration.js');
const ModerationService = require('../../services/ModerationService.js');

class ModRoles extends patron.Command {
    constructor() {
        super({
            names: ['modroles', 'modrole'],
            groupName: 'general',
            description: 'View all moderation roles in this guild.'
        });
    }

    async run(msg, args) {
        const modRoleList = msg.dbGuild.roles.mod.sort((a, b) => a.permissionLevel - b.permissionLevel);

        if (msg.dbGuild.roles.mod.length === 0) {
            return msg.sender.reply('No moderation role data found.', { color: Configuration.errorColour });
        }

        let description = '';
        for (let i = 0; i < modRoleList.length; i++) {
            const rank = msg.guild.roles.find((x) => x.id === modRoleList[i].id);

            description += rank.toString() + ': ' + modRoleList[i].permissionLevel + '\n';
        }

        return msg.sender.send(description + '\n**Permission Levels:**\n**1)** Moderator\n**2)** Administrator\n**3)** Owner\n\nYour permission level: ' + ModerationService.getPermLevelStr(msg.dbGuild, msg.member), { title: 'Moderation Roles' });
    }
}

module.exports = new ModRoles();
