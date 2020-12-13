const client = require('../singletons/client.js');
const Configuration = require('../utils/Configuration.js');
const Logger = require('../utils/Logger.js');
const Sender = require('../utils/Sender.js');

let startup = true;
let lastMem = (process.memoryUsage().rss / 1048576).toFixed(2);

client.setInterval(() => {
    (async function () {
        if (!startup) {
            const guild = await client.guilds.cache.get('480320873534849025');
            const channel = await guild.channels.cache.get('632899724533563411');
            const currentMem = (process.memoryUsage().rss / 1048576).toFixed(2);

            if (currentMem > 500) {
                await Sender.sendFields(channel,
                    ['Status', 'Memory usage has exceeded 500MB',
                        'Current Usage', currentMem + 'MB',
                        'Usage Five Minutes Ago', lastMem + 'MB'], { color: Configuration.errorColour, timestamp: true });
                return lastMem = currentMem;
            }

            if ((currentMem - lastMem).toFixed(2) > 30) {
                await Sender.sendFields(channel,
                    ['Status', 'Memory usage has increased by ' + (currentMem - lastMem).toFixed(2) + 'MB in the last 5 minutes.',
                        'Current Usage', currentMem + 'MB',
                        'Usage Five Minutes Ago', lastMem + 'MB'], { color: Configuration.orangeColour, timestamp: true });
                return lastMem = currentMem;
            }
        } else {
            startup = false;
        }
    })().catch((err) => Logger.handleError(err));
}, Configuration.intervals.checkBot);
