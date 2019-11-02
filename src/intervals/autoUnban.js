const db = require('../database/index.js');
const Configuration = require('../utils/Configuration.js');
const LoggingService = require('../services/LoggingService.js');
const client = require('../singletons/client.js');
const Logger = require('../utils/Logger.js');

client.setInterval(() => {
    (async function () {
        await Logger.log('Interval: Auto Unban', 'INFO');

        const bans = await db.banRepo.findMany();

        for (let i = 0; i < bans.length; i++) {
            if (bans[i].bannedAt + bans[i].banLength > Date.now()) {
                continue;
            }

            await db.banRepo.deleteById(bans[i]._id);

            const guild = client.guilds.get(bans[i].guildId);

            if (guild === undefined) {
                continue;
            }

            const user = await client.users.fetch(bans[i].userId);

            if (user === null) {
                continue;
            }

            const dbGuild = await db.guildRepo.getGuild(guild.id);

            if (!guild.me.hasPermission('BAN_MEMBERS')) {
                await LoggingService.log(dbGuild, guild, Configuration.errorColour, null, `I tried to unban ${user.tag} but I do not have the required permissions to do.`);
                continue;
            }

            await guild.members.unban(user, `Automatic Unban`);
            await LoggingService.modLog(dbGuild, guild, 'Automatic Unban', Configuration.greenColour, '', null, user);
        }
    })().catch((err) => Logger.handleError(err));
}, Configuration.intervals.autoUnban);
