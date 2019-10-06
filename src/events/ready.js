const client = require('../singletons/client.js');
const Configuration = require('../utils/Configuration.js');
const Logger = require('../utils/Logger.js');

client.on('ready', async () => {
    (async () => {
        await client.user.setActivity(Configuration.game.activity[0], { type: Configuration.game.type });
        await Logger.log("Shadow has successfully connected.", 'INFO');
    })().catch((err) => Logger.handleError(err));
});
