const db = require('../database/index.js');
const Configuration = require('../utils/Configuration.js');
const LoggingService = require('../services/LoggingService.js');
const client = require('../singletons/client.js');
const Logger = require('../utils/Logger.js');

setInterval(() => {
    (async function () {
        await Logger.log('Interval: Auto Unmute', 'INFO');

        const mutes = await db.muteRepo.findMany();

        for (let i = 0; i < mutes.length; i++) {
            if (mutes[i].mutedAt + mutes[i].muteLength > Date.now()) {
                continue;
            }

            await db.muteRepo.deleteById(mutes[i]._id);

            const guild = client.guilds.cache.get(mutes[i].guildId);

            if (guild === undefined) {
                continue;
            }

            const member = guild.member(mutes[i].userId);

            if (member === null) {
                continue;
            }

            const dbGuild = await db.guildRepo.getGuild(guild.id);
            const role = guild.roles.cache.get(dbGuild.roles.muted);

            if (role === undefined) {
                continue;
            }

            if (!guild.me.hasPermission('MANAGE_ROLES') || role.position >= guild.me.roles.highest.position) {
                await LoggingService.log(dbGuild, guild, Configuration.errorColour, null, `I tried to unmute ${member.user.tag} but I do not have the required permissions to remove their Muted role.`);
                continue;
            }

            await member.roles.remove(role);
            await LoggingService.modLog(dbGuild, guild, 'Automatic Unmute', Configuration.greenColour, '', null, member.user);
        }
    })().catch((err) => Logger.handleError(err));
}, Configuration.intervals.autoUnmute);
