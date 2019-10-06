const patron = require('patron.js');
const NumericUtils = require('../../utils/NumericUtils');

class Stats extends patron.Command {
    constructor() {
        super({
            names: ['stats', 'statistics', 'stat'],
            groupName: 'general',
            description: 'View Shadow\'s statistics.',
        });
    }

    async run(msg, args) {
        const uptime = NumericUtils.msToTime(msg.client.uptime);
        return msg.sender.sendFields([
            'Authors', 'Fozzie#0001, Brandon14#0131, Jayden 🎃#8080',
            'Guilds', msg.client.guilds.size,
            'Memory', `${(process.memoryUsage().rss / 1048576).toFixed(2)} MB`,
            'Node.js version', `v${process.versions.node}`,
            'Uptime', `${uptime.days}d ${uptime.hours}h ${uptime.minutes}m`
        ])
    }
}

module.exports = new Stats();
