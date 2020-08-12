const client = require('../singletons/client.js');
const Logger = require('../utils/Logger.js');
const Sender = require('../utils/Sender.js');
const Configuration = require('../utils/Configuration.js');
const db = require('../database/index.js');

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
                    const logChannel = message.guild.channels.get(dbGuild.channels.messageLog);

                    if (logChannel !== undefined) {
                        const options = {
                            color: Configuration.orangeColour,
                            footer: 'User ID: ' + message.author.id,
                            timestamp: true
                        };

                        let fields = ['Action', `Message Deletion in ${message.channel}`,
                            'Content', message.content];
                        for (let i = 0; i < message.attachments.size; i++) {
                            console.log(message.attachments[i]);
                            fields.push(`Attachment ${i}`);
                            fields.push(`[View](${message.attachments[i][0].proxyURL})`)
                        }

                        options.author = {
                            name: message.author.tag,
                            icon_url: message.author.displayAvatarURL(),
                        };

                        await Sender.sendFields(logChannel, fields, options);
                    }
                }
            }
        }

    })().catch((err) => Logger.handleError(err));
});
