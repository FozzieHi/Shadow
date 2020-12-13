const patron = require('patron.js');
const NumericUtils = require('../../utils/NumericUtils');

class Stats extends patron.Command {
    constructor() {
        super({
            names: ['stats', 'statistics', 'stat'],
            groupName: 'general',
            description: 'View Shadow\'s statistics.',
            guildOnly: false
        });
    }

    async run(msg, args) {
        const uptime = NumericUtils.msToTime(msg.client.uptime);
        return msg.sender.sendFields([
            'Authors', 'Fozzie#0001, Brandon14#0131, Jayden 🎃#8080',
            'Guilds', msg.client.guilds.cache.size,
            'Users', msg.client.users.cache.size,
            'Memory', `${(process.memoryUsage().rss / 1048576).toFixed(2)} MB`,
            'Node.js version', `v${process.versions.node}`,
            'Invite', `https://shdw.cc`,
            'Uptime', `${uptime.days}d ${uptime.hours}h ${uptime.minutes}m`
        ])
    }
}

module.exports = new Stats();
