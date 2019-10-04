const client = require('../singletons/client.js');

client.on('ready', async () => {
    (async () => {
        await console.log("Shadow has successfully connected.");
    })().catch((err) => {
        console.log(err);
    })
});
