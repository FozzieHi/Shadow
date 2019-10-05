const client = require('../singletons/client.js');
const AutoModerationService = require('../services/AutoModerationService.js');

client.on('messageUpdate', (oldMessage, newMessage) => {
    (async () => {
        if (newMessage.author.bot) {
            return;
        }

        const inGuild = newMessage.guild !== null;

        if (inGuild) {
            AutoModerationService.antiAdvertisingMsg(newMessage);
        }

    })().catch((err) => {
        console.log(err);
    })
});