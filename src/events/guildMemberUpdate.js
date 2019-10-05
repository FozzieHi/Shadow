const client = require('../singletons/client.js');
const AutoModerationService = require('../services/AutoModerationService.js');

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    (async () => {
        if (newMember.nickname != null) {
            AutoModerationService.antiAdvertisingNick(newMember, newMember.guild, newMember.nickname);
        }
    })().catch((err) => {
        console.log(err);
    })
});
