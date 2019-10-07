const client = require('../singletons/client.js');
const db = require('../database/index.js');
const Logger = require('../utils/Logger.js');
const Configuration = require('../utils/Configuration.js');
const Sender = require('../utils/Sender.js');

client.on('guildMemberRemove', async (member) => {
    (async () => {
        const dbGuild = await db.guildRepo.getGuild(member.guild.id);
        if (dbGuild.logJoinLeave) {
            const logChannel = member.guild.channels.get(dbGuild.channels.joinLeaveLog);

            if (logChannel !== undefined && logChannel !== null) {
                const options = {
                    color: Configuration.lightOrangeColour,
                    footer: 'User ID: ' + member.id,
                    timestamp: true
                };

                options.author = {
                    name: member.user.tag,
                    icon_url: member.user.displayAvatarURL()
                };

                await Sender.sendFields(logChannel, [
                    'Action', `Left the server`,
                    'Members now', member.guild.memberCount], options);
            }
        }
    })().catch((err) => Logger.handleError(err));
});
