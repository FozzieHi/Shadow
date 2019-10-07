const db = require('../database/index.js');
const Discord = require('discord.js');
const Random = require('../utils/Random.js');
const Configuration = require('../utils/Configuration.js');

class MenuService {

    async spawnSettingsMain(msg, dbGuild, userID, type = '') {
        let logChannel = msg.guild.channels.get(dbGuild.channels.log);
        let mutedRole = msg.guild.roles.get(dbGuild.roles.muted);
        let messageLogChannel = msg.guild.roles.get(dbGuild.channels.messageLog);
        let messageLogging = dbGuild.logMessages;
        let joinLeaveLogChannel = msg.guild.roles.get(dbGuild.channels.joinLeaveLog);
        let joinLeaveLogging = dbGuild.logJoinLeave;
        logChannel !== undefined ? logChannel = '- #' + logChannel.name : logChannel = '';
        mutedRole !== undefined ? mutedRole = '- ' + mutedRole.name : mutedRole = '';
        messageLogChannel !== undefined ? messageLogChannel = '- #' + messageLogChannel.name : messageLogChannel = '';
        joinLeaveLogChannel !== undefined ? joinLeaveLogChannel = '- #' + joinLeaveLogChannel.name : joinLeaveLogChannel = '';

        const embed = new Discord.MessageEmbed()
            .setColor(Random.arrayElement(Configuration.defaultColours))
            .setTitle('Guild settings for ' + msg.guild.name)
            .setThumbnail(msg.guild.iconURL)
            .addField(`🇵 Prefix - ${dbGuild.prefix}`, 'Set the Bot\'s prefix.', true)
            .addField(`🙉 Muted role ${mutedRole}`, 'Set the Muted role.', true)
            .addField(`📖 Log channel ${logChannel}`, `Set the logging channel.`, true)
            .addField(`🔄 Message logging ${messageLogging ? Configuration.emotes.enabled : Configuration.emotes.disabled}`, (messageLogging ? `Disable` : `Enable`) + ` message logging.`, true)
            .addField(`🖊 Message Log channel ${messageLogChannel}`, `Set the message logging channel.`, true)
            .addField(`👋 Join/Leave logging ${joinLeaveLogging ? Configuration.emotes.enabled : Configuration.emotes.disabled}`, (joinLeaveLogging ? `Disable` : `Enable`) + ` join/leave logging.`, true)
            .addField(`✍ Join/Leave Log channel ${joinLeaveLogChannel}`, `Set the join/leave logging channel.`, true)
            .addField(`⚒ Auto Moderation`, 'Auto Moderation submenu.', true)
            .addField('✏ Reset guild', 'Reset Shadow guild data.', true)
            .addField('📝 Reset users', 'Reset Shadow user data.', true)
            .addField('<:exitmenu:481042834875482112> Exit', 'Exit the Settings page.', true);
        let reply;
        if (type === 'edit') {
            await msg.reactions.removeAll();
            reply = await msg.edit({ embed });
        } else {
            reply = await msg.channel.send({ embed });
        }
        await reply.react('🇵');
        await reply.react('🙉');
        await reply.react('📖');
        await reply.react('🔄');
        await reply.react('🖊');
        await reply.react('👋');
        await reply.react('✍');
        await reply.react('⚒');
        await reply.react('✏');
        await reply.react('📝');
        await reply.react('481042834875482112');
        return db.guildRepo.upsertGuild(msg.guild.id, new db.updates.Push('pages.settings', { id: reply.id, user: userID }));
    }

    async spawnAutoMod(msg, dbGuild, userID) {
        await this.checkForNulls(msg, dbGuild);
        const embed = new Discord.MessageEmbed()
            .setColor(Random.arrayElement(Configuration.defaultColours))
            .setTitle('Auto Moderation for ' + msg.guild.name)
            .setThumbnail(msg.guild.iconURL)
            .addField('🛑 Anti-Advert - ' + (dbGuild.autoMod.antiad ? Configuration.emotes.enabled : Configuration.emotes.disabled), (dbGuild.autoMod.antiad ? 'Disable' : 'Enable') + ' Advertising Protection.')
            .addField('⌨ Anti-Mention Spam - ' + (dbGuild.autoMod.mention ? Configuration.emotes.enabled : Configuration.emotes.disabled), (dbGuild.autoMod.mention ? 'Disable' : 'Enable') + ' Mention Spam Protection.')
            .addField('🗒 Anti-Mention Spam Limit - ' + (dbGuild.autoMod.mentionLimit), 'The amount of users mentioned in a single message to trigger an alert.')
            .addField('⬅ Back', 'Return back to the Main Settings page.');
        await msg.reactions.removeAll();
        const reply = await msg.edit({ embed });
        await reply.react('🛑');
        await reply.react('⌨');
        await reply.react('🗒');
        await reply.react('⬅');
        await db.guildRepo.upsertGuild(msg.guild.id, new db.updates.Push('pages.autoMod', { id: reply.id, user: userID }));
    }

    async checkForNulls(msg, dbGuild) {
        if (dbGuild.autoMod.antiad === undefined || dbGuild.autoMod.antiad === null) {
            await db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'autoMod.antiad': false } });
        }
        if (dbGuild.autoMod.mention === undefined || dbGuild.autoMod.mention === null) {
            await db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'autoMod.mention': false } });
        }
    }
}

module.exports = new MenuService();
