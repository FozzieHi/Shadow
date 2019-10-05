const Configuration = require('../utils/Configuration.js');
const LoggingService = require('../services/LoggingService.js');

class AutoModerationService {

    antiAdvertisingMsg(msg) {
        const content = msg.content.split(' ').join('').toLowerCase();
        if (Configuration.regexes.antiad.test(content)) {
            msg.delete();
            LoggingService.log(msg.dbGuild, msg.guild, Configuration.orangeColour, msg.author, `Posted an advertisement in ${msg.channel}\n\n**Message:** ${msg.content}`);
        }
    }

    antiAdvertisingNick(dbGuild, member, guild, nick) {
        nick = nick.split(' ').join('').toLowerCase();
        if (Configuration.regexes.antiad.test(nick)) {
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
            LoggingService.log(dbGuild, guild, Configuration.orangeColour, member.user, 'Had an advertisement in their nickname and their username so I banned them.');
            return guild.ban(member.user);
        }
    }
}

module.exports = new AutoModerationService();
