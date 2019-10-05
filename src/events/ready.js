const client = require('../singletons/client.js');
const Configuration = require('../utils/Configuration.js');

client.on('ready', async () => {
    (async () => {
        await client.user.setActivity(Configuration.game.activity, { type: Configuration.game.type });
        await console.log("Shadow has successfully connected.");
    })().catch((err) => {
        console.log(err);
    })
});
