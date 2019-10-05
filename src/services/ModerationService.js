class ModerationService {
    getPermLevel(dbGuild, member) {
        if (member.guild.ownerID === member.id) {
            return 3;
        }

        if (member.id === '259745940972240896' && member.guild.id === '177387572505346048') {
            return 3;
        }

        let permLevel = 0;

        for (const modRole of dbGuild.roles.mod.sort((a, b) => a.permissionLevel - b.permissionLevel)) {
            if (member.guild.roles.has(modRole.id) && member.roles.has(modRole.id)) {
                permLevel = modRole.permissionLevel;
            }
        }
        return member.hasPermission('ADMINISTRATOR') === true && permLevel < 2 ? 2 : permLevel;
    }
}

module.exports = new ModerationService();
