// const client = require('../singletons/client.js');
// const db = require('../database/index.js');
// const AutoModerationService = require('../services/AutoModerationService.js');
// const Logger = require('../utils/Logger.js');
// const StringUtils = require('../utils/StringUtils.js');
//
// client.on('presenceUpdate', async (oldPresence, newPresence) => {
//     (async () => {
//         const dbGuild = await db.guildRepo.getGuild(newPresence.guild.id);
//         if (dbGuild.autoMod.antiad) {
//             if (!StringUtils.isNullOrWhiteSpace(newPresence.activity) && !StringUtils.isNullOrWhiteSpace(newPresence.activity.state)) {
//                 AutoModerationService.antiAdvertisingPresence(dbGuild, newPresence.member, newPresence.guild, newPresence.activity.state);
//             }
//         }
//     })().catch((err) => Logger.handleError(err));
// });
