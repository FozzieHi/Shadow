const client = require('../singletons/client.js');
const AutoModerationService = require('../services/AutoModerationService.js');
const Logger = require('../utils/Logger.js');
const Sender = require('../utils/Sender.js');
const Configuration = require('../utils/Configuration.js');
const db = require('../database/index.js');
const Discord = require('discord.js');

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

            if (dbGuild.logMessages) {
                if (newMessage.type === 'DEFAULT' && oldMessage.content !== newMessage.content) {
                    const logChannel = newMessage.guild.channels.cache.get(dbGuild.channels.messageLog);

                    if (logChannel !== undefined) {
                        const buttons = [[
                            new Discord.MessageButton().setCustomId('userid-' + newMessage.author.id).setLabel("User ID").setStyle('SECONDARY')
                        ]];
                        const options = {
                            color: Configuration.lightOrangeColour,
                            footer: 'User ID: ' + newMessage.author.id + ' - Message ID: ' + newMessage.id,
                            timestamp: true
                        };

                        options.author = {
                            name: newMessage.author.tag,
                            icon_url: newMessage.author.displayAvatarURL()
                        };

                        await Sender.sendFields(logChannel, [
                            'Action', `Message Edit in ${newMessage.channel.toString()} [Jump to message](${newMessage.url})`,
                            'Before', oldMessage.content,
                            'After', newMessage.content], options, { components: buttons.map(b => ({ type: 1, components: b }))});
                    }
                }
            }
        }

    })().catch((err) => Logger.handleError(err));
});
