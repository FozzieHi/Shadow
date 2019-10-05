const LoggingService = require('./LoggingService.js');
const Try = require('../utils/Try.js');
const db = require('../database/index.js');
const Configuration = require("../utils/Configuration");

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

    getPermLevelStr(dbGuild, member) {
        const permL = this.getPermLevel(dbGuild, member);
        if (permL === 1) {
            return 'Moderator';
        }
        if (permL === 2) {
            return 'Administrator';
        }
        if (permL === 3) {
            return 'Owner';
        }
        return 'Member';
    }

    async submitPunishment(guild, dbGuild, action, user, moderator, reason, sender) {
        const dbUser = await db.userRepo.getUser(user.id, guild.id);
        const date = new Date();
        const readableDate = await new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMonth(), date.getSeconds());
        await Try(sender.dm(`A moderator has ${action.toLowerCase()}ed you for the reason ${reason}`, { footer: guild.name }, user));
        await db.userRepo.upsertUser(user.id, guild.id, new db.updates.Push('punishments', { id: dbUser.punishmentId, date: Date.now(), readableDate: readableDate.toGMTString(), action: action, reason: reason, mod: moderator.tag }));
        await db.userRepo.upsertUser(user.id, guild.id, { $inc: { punishmentId: 1 } });
        return LoggingService.modLog(dbGuild, guild, action, Configuration.orangeColour, reason, moderator, user);
    }
}

module.exports = new ModerationService();
