const Configuration = require('../utils/Configuration.js');
const LoggingService = require('../services/LoggingService.js');
const ModerationService = require('../services/ModerationService.js');

class AutoModerationService {

    antiAdvertisingMsg(msg) {
        const content = msg.content.split(' ').join('').toLowerCase();
        if (Configuration.regexes.antiad.test(content)) {
            if (ModerationService.getPermLevel(msg.dbGuild, msg.member) >= 1) {
                return LoggingService.log(msg.dbGuild, msg.guild, Configuration.orangeColour, msg.author, `Bypassed the Anti Advertising module by posting an advertisement in ${msg.channel} [Jump to message](${msg.url})\n\n**Message:** ${msg.content}`);
            }
            msg.delete();
            LoggingService.log(msg.dbGuild, msg.guild, Configuration.orangeColour, msg.author, `Posted an advertisement in ${msg.channel} [Jump to message](${msg.url})\n\n**Message:** ${msg.content}`);
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
            LoggingService.log(dbGuild, guild, Configuration.orangeColour, member.user, `Had an their nickname, so I changed it.\n\n**Old Nickname:** ${nick}\n**New Nickname:** ${member.user.username}`);
            return member.setNickname(member.user.username);
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

   async antiMentionSpamMsg(msg) {
        const mentions = msg.mentions.users.size;

        if (mentions >= msg.dbGuild.autoMod.mentionLimit) {
            const role = msg.guild.roles.get(msg.dbGuild.roles.muted);
            if (role === undefined || role === null || !msg.guild.me.hasPermission('MANAGE_ROLES') || role.position >= msg.guild.me.roles.highest.position) {
                return LoggingService.log(msg.dbGuild, msg.guild, Configuration.errorColour, msg.author, `${msg.author.tag} mentioned ${mentions} different users in a single message, but I do not have permission to give them the Muted role. [Jump to message](${msg.url})`);
            }
            LoggingService.log(msg.dbGuild, msg.guild, Configuration.errorColour, msg.author, `${msg.author.tag} mentioned ${mentions} different users in a single message so I muted them. [Jump to message](${msg.url})`);
            return msg.member.roles.add(role);
        }
    }
}

module.exports = new AutoModerationService();
