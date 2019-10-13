const client = require('../singletons/client.js');
const Configuration = require('../utils/Configuration.js');
const Logger = require('../utils/Logger.js');
const Sender = require('../utils/Sender.js');

client.on('ready', async () => {
    (async () => {
        await client.user.setActivity(Configuration.game.activity[0], { type: Configuration.game.type });
        await Logger.log("Shadow has successfully connected.", 'INFO');
        const guild = await client.guilds.get('480320873534849025');
        const channel = await guild.channels.get('632899724533563411');
        return Sender.send(channel, 'Shadow has connected.');
    })().catch((err) => Logger.handleError(err));
});
