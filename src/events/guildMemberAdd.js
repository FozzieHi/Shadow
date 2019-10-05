const client = require('../singletons/client.js');
const AutoModerationService = require('../services/AutoModerationService.js');

client.on('guildMemberAdd', async (member) => {
    (async () => {
        AutoModerationService.antiAdvertisingUsername(member, member.guild, member.user.username);
    })().catch((err) => {
        console.log(err);
    })
});
