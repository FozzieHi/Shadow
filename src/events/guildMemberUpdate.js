const client = require('../singletons/client.js');
const db = require('../database/index.js');
const AutoModerationService = require('../services/AutoModerationService.js');
const Logger = require('../utils/Logger.js');

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    (async () => {
        const dbGuild = await db.guildRepo.getGuild(newMember.guild.id);
        if (dbGuild.autoMod.antiad) {
            if (newMember.nickname != null) {
                AutoModerationService.antiAdvertisingNick(dbGuild, newMember, newMember.guild, newMember.nickname);
            }
        }
    })().catch((err) => Logger.handleError(err));
});
