const Sender = require('../utils/Sender.js');
const Configuration = require('../utils/Configuration.js');
const StringUtils = require("../utils/StringUtils");

class LoggingService {
    log(dbGuild, guild, color, author, message) {
        const logChannel = guild.channels.get(dbGuild.channels.log);
        const options = {
            color: color,
            timeStamp: true
        };

        if (author !== null) {
            options.author = {
                name: author.tag,
                icon: author.avatarURL,
                URL: Configuration.invites.bot
            };
        }

        return Sender.send(logChannel, message, options);
    }

    modLog(dbGuild, guild, action, color, reason = '', moderator, user) {
        const logChannel = guild.channels.get(dbGuild.channels.log);
        const options = {
            color: color,
            timeStamp: true
        };

        if (moderator !== null) {
            options.author = {
                name: moderator.tag,
                icon: moderator.avatarURL,
                URL: Configuration.invites.bot
            };
        }

        let fields = ['Action', action];
        if (user !== null) {
            fields.push('User', `${user.tag} (${user.id})`);
        }

        if (!StringUtils.isNullOrWhiteSpace(reason)) {
            fields.push('Reason', reason);
        }

        return Sender.sendFields(logChannel, fields, options);
    }
}

module.exports = new LoggingService();
