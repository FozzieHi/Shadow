const client = require('../singletons/client.js');
const Logger = require('../utils/Logger.js');
const Sender = require('../utils/Sender.js');
const StringUtils = require('../utils/StringUtils.js');
const Configuration = require('../utils/Configuration.js');
const db = require('../database/index.js');
const Discord = require('discord.js');

client.on('messageDelete', (message) => {
    (async () => {
        if (message.author.bot) {
            return;
        }

        const inGuild = message.guild !== null;

        if (inGuild) {
            const dbGuild = await db.guildRepo.getGuild(message.guild.id);

            if (dbGuild.logMessages) {
                if (message.type === 'DEFAULT') {
                    const logChannel = message.guild.channels.cache.get(dbGuild.channels.messageLog);

                    if (logChannel !== undefined) {
                        const buttons = [[
                            new Discord.MessageButton().setCustomId('userid-' + message.user.id).setLabel("User ID").setStyle('SECONDARY')
                        ]];
                        const options = {
                            color: Configuration.orangeColour,
                            footer: 'User ID: ' + message.author.id + ' - Message ID: ' + message.id,
                            timestamp: true
                        };

                        let fields = ['Action', `Message Deletion in ${message.channel}`];
                        if (!StringUtils.isNullOrWhiteSpace(message.content)) {
                            fields.push('Content');
                            fields.push(message.content);
                        }

                        for (let i = 0; i < message.attachments.size; i++) {
                            fields.push(`Attachment ${i + 1}`);
                            fields.push(`[View](${message.attachments.array()[i].proxyURL})`)
                        }

                        const auditLog = await message.guild.fetchAuditLogs({ type: "MESSAGE_DELETE" }).then(audit => audit.entries.first());
                        if (auditLog.extra.channel.id === message.channel.id && auditLog.target.id === message.author.id && auditLog.createdTimestamp > Date.now() - 5000 && auditLog.extra.count >= 1) {
                            fields.push(`Deleted By`);
                            fields.push(auditLog.executor);
                        }

                        options.author = {
                            name: message.author.tag,
                            icon_url: message.author.displayAvatarURL(),
                        };

                        await Sender.sendFields(logChannel, fields, options, { components: buttons.map(b => ({ type: 1, components: b }))});
                    }
                }
            }
        }

    })().catch((err) => Logger.handleError(err));
});
