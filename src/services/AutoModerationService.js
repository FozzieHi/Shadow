const Configuration = require('../utils/Configuration.js');

class AutoModerationService {

    antiAdvertisingMsg(msg) {
        const content = msg.content.split(' ').join('');
        if (Configuration.regexes.antiad.test(content)) {
            msg.delete();
        }
    }

    antiAdvertisingNick(member, guild, nick) {
        nick = nick.split(' ').join('');
        if (Configuration.regexes.antiad.test(nick)) {
            if (Configuration.regexes.antiad.test(member.user.username)) {
                return guild.ban(member.user);
            }
            return member.setNickname(member.user.username);
        }
    }

    antiAdvertisingUsername(member, guild, username) {
        username = username.split(' ').join('');
        if (Configuration.regexes.antiad.test(username)) {
            return guild.ban(member.user);
        }
    }
}

module.exports = new AutoModerationService();
