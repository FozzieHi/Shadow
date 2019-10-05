const Sender = require('../utils/Sender.js');

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
                icon: author.avatarURL
            };
        }

        return Sender.send(logChannel, message, options);
    }
}

module.exports = new LoggingService();
