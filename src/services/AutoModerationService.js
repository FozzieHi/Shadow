const Configuration = require('../utils/Configuration.js');
const LoggingService = require('../services/LoggingService.js');
const ModerationService = require('../services/ModerationService.js');
const db = require('../database/index.js');

class AutoModerationService {

    async antiAdvertisingMsg(msg) {
        const content = msg.content.split(' ').join('').toLowerCase();
        if (Configuration.regexes.antiad.test(content)) {
            if (ModerationService.getPermLevel(msg.dbGuild, msg.member) >= 1) {
                return LoggingService.log(msg.dbGuild, msg.guild, Configuration.orangeColour, msg.author, `Bypassed the Anti Advertising module by posting an advertisement in ${msg.channel} [Jump to message](${msg.url})\n\n**Message:** ${msg.content}`);
            }
            msg.delete();
            const messages = await msg.channel.messages.fetch({ limit: 2 });
            const aboveMessage = messages.last().url;

            LoggingService.log(msg.dbGuild, msg.guild, Configuration.orangeColour, msg.author, `Posted an advertisement in ${msg.channel} [Jump to message above](${aboveMessage})\n\n**Message:** ${msg.content}`);
            if (msg.dbUser.automod.advertisementStart + 600000 > Date.now()) {
                if (msg.dbUser.automod.advertisementCount >= 2) {
                    const role = msg.guild.roles.cache.get(msg.dbGuild.roles.muted);
                    LoggingService.log(msg.dbGuild, msg.guild, Configuration.errorColour, msg.author, `${msg.author.tag} posted 3 or more advertisements within 10 minutes so I muted them.`);
                    return msg.member.roles.add(role);
                }
                await db.userRepo.upsertUser(msg.author.id, msg.guild.id, { $inc: { 'automod.advertisementCount': 1 } });
            } else {
                await db.userRepo.upsertUser(msg.author.id, msg.guild.id, { $set: { 'automod.advertisementStart': Date.now() }});
                await db.userRepo.upsertUser(msg.author.id, msg.guild.id, { $set: { 'automod.advertisementCount': 1 } });
            }
        }
    }

    antiAdvertisingNick(dbGuild, member, guild, nick) {
        nick = nick.split(' ').join('').toLowerCase();
        if (Configuration.regexes.antiad.test(nick)) {
            if (ModerationService.getPermLevel(dbGuild, member) >= 1) {
                return LoggingService.log(dbGuild, guild, Configuration.orangeColour, member.user, `Bypassed the Anti Advertising module but has an advertisement in their nickname.\n\n**Nickname:** ${nick}`);
            }
            if (Configuration.regexes.antiad.test(member.user.username)) {
                LoggingService.log(dbGuild, guild, Configuration.orangeColour, member.user, 'Had an advertisement in their nickname and their username so I banned them.');
                return guild.ban(member.user);
            }
            LoggingService.log(dbGuild, guild, Configuration.orangeColour, member.user, `Had an advertisement in their nickname, so I changed it.\n\n**Old Nickname:** ${nick}\n**New Nickname:** ${member.user.username}`);
            return member.setNickname(member.user.username);
        }
    }

    antiAdvertisingPresence(dbGuild, member, guild, presence) {
        presence = presence.split(' ').join('').toLowerCase();
        if (Configuration.regexes.antiad.test(presence)) {
            if (ModerationService.getPermLevel(dbGuild, member) >= 1) {
                return LoggingService.log(dbGuild, guild, Configuration.orangeColour, member.user, `Bypassed the Anti Advertising module but has an advertisement in their presence.\n\n**Presence:** ${presence}`);
            }
            LoggingService.log(dbGuild, guild, Configuration.orangeColour, member.user, `Had an advertisement in their presence so I banned them.\n\n**Presence:** ${presence}`);
            return guild.ban(member.user);
        }
    }

    antiAdvertisingUsername(dbGuild, member, guild, username) {
        username = username.split(' ').join('').toLowerCase();
        if (Configuration.regexes.antiad.test(username)) {
            if (ModerationService.getPermLevel(dbGuild, member) >= 1) {
                return LoggingService.log(dbGuild, guild, Configuration.orangeColour, member.user, `Bypassed the Anti Advertising module but has an advertisement in their username.\n\n**Username:** ${member.user.username}`);
            }
            LoggingService.log(dbGuild, guild, Configuration.orangeColour, member.user, 'Had an advertisement in their nickname and their username so I banned them.');
            return guild.ban(member.user);
        }
    }

    antiMentionSpamMsg(msg) {
        const mentions = msg.mentions.users.size;

        if (mentions >= msg.dbGuild.autoMod.mentionLimit) {
            const role = msg.guild.roles.cache.get(msg.dbGuild.roles.muted);
            if (role === undefined || role === null || !msg.guild.me.hasPermission('MANAGE_ROLES') || role.position >= msg.guild.me.roles.highest.position) {
                return LoggingService.log(msg.dbGuild, msg.guild, Configuration.errorColour, msg.author, `${msg.author.tag} mentioned ${mentions} different users in a single message, but I do not have permission to give them the Muted role. [Jump to message](${msg.url})`);
            }
            LoggingService.log(msg.dbGuild, msg.guild, Configuration.errorColour, msg.author, `${msg.author.tag} mentioned ${mentions} different users in a single message so I muted them. [Jump to message](${msg.url})`);
            return msg.member.roles.add(role);
        }
    }

    // checkMatches(matches) {
    //     if (matches > 0) {
    //         for (let i = 0; i < matches.size; i++) {
    //             const result = await client.fetchInvite(`https://discord.gg/${matches[i]}`);
    //             return ((result.maxAge === 0 || result.expiresTimestamp > Date.now()) && (result.maxUses === 0 || result.uses < result.maxUses));
    //         }
    //     }
    // }
}

module.exports = new AutoModerationService();
