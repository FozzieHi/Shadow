const client = require('../singletons/client.js');
const AutoModerationService = require('../services/AutoModerationService.js');
const Logger = require('../utils/Logger.js');

client.on('messageUpdate', (oldMessage, newMessage) => {
    (async () => {
        if (newMessage.author.bot) {
            return;
        }

        const inGuild = newMessage.guild !== null;

        if (inGuild) {
            const dbGuild = await db.guildRepo.getGuild(newMessage.guild.id);
            dbGuild.autoMod.antiad ? await AutoModerationService.antiAdvertisingMsg(newMessage) : null;
            dbGuild.autoMod.mention ? await AutoModerationService.antiMentionSpamMsg(newMessage) : null;
        }

    })().catch((err) => Logger.handleError(err));
});
