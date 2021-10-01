const client = require('../singletons/client.js');
const db = require('../database/index.js');
const AutoModerationService = require('../services/AutoModerationService.js');
const Logger = require('../utils/Logger.js');
const LoggingService = require('../services/LoggingService.js');
const Configuration = require('../utils/Configuration.js');
const Sender = require('../utils/Sender.js');
const Discord = require('discord.js');

client.on('guildMemberAdd', async (member) => {
    (async () => {
        const dbGuild = await db.guildRepo.getGuild(member.guild.id);
        if (dbGuild.autoMod.antiad) {
            AutoModerationService.antiAdvertisingUsername(dbGuild, member, member.guild, member.user.username);
        }

        if (dbGuild.roles.muted !== null && await db.muteRepo.anyMute(member.id, member.guild.id)) {
            const role = member.guild.roles.cache.get(dbGuild.roles.muted);

            if (!(role === undefined || !member.guild.me.hasPermission('MANAGE_ROLES') || role.position >= member.guild.me.roles.highest.position)) {
                return member.roles.add(role);
            }

            const logChannel = member.guild.channels.cache.get(dbGuild.channels.log);

            if (logChannel !== undefined && logChannel !== null) {
                return LoggingService.log(dbGuild, member.guild, Configuration.errorColour, null, `${member.user.tag} is muted and rejoined, I do not have permission to give them the Muted role again.`);
            }
        }

        if (dbGuild.logJoinLeave) {
            const logChannel = member.guild.channels.cache.get(dbGuild.channels.joinLeaveLog);

            if (logChannel !== undefined && logChannel !== null) {
                const buttons = [[
                    new Discord.MessageButton().setCustomId('userid-' + member.id).setLabel("User ID").setStyle('SECONDARY')
                ]];
                const options = {
                    color: Configuration.greenColour,
                    footer: 'User ID: ' + member.id,
                    timestamp: true
                };

                options.author = {
                    name: member.user.tag,
                    icon_url: member.user.displayAvatarURL()
                };

                await Sender.sendFields(logChannel, [
                    'Action', `Joined the server`,
                    'Members now', member.guild.memberCount], options, { components: buttons.map(b => ({ type: 1, components: b }))});
            }
        }
    })().catch((err) => Logger.handleError(err));
});
