const Sender = require('../utils/Sender.js');
const StringUtils = require('../utils/StringUtils');
const Configuration = require('../utils/Configuration.js');

class LoggingService {
    log(dbGuild, guild, color, author, message) {
        const logChannel = guild.channels.cache.get(dbGuild.channels.log);
        const options = {
            color: color,
            timestamp: true
        };

        if (author !== null) {
            options.author = {
                name: author.tag,
                icon_url: author.displayAvatarURL(),
                url: Configuration.invites.bot
            };
        }

        return Sender.send(logChannel, message, options);
    }

    modLog(dbGuild, guild, action, color, reason = '', moderator, user, extraInfoKey = '', extraInfoValue = '') {
        const logChannel = guild.channels.cache.get(dbGuild.channels.log);
        const options = {
            color: color,
            timestamp: true
        };

        if (moderator !== null) {
            options.author = {
                name: moderator.tag,
                icon_url: moderator.displayAvatarURL(),
                url: Configuration.invites.bot
            };
        }

        let fields = ['Action', action];
        if (user !== null) {
            fields.push('User', `${user.tag} (${user.id})`);
        }

        if (!StringUtils.isNullOrWhiteSpace(reason)) {
            fields.push('Reason', reason);
        }

        if (!StringUtils.isNullOrWhiteSpace(extraInfoKey)) {
            fields.push(extraInfoKey, extraInfoValue);
        }

        return Sender.sendFields(logChannel, fields, options);
    }
}

module.exports = new LoggingService();
