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

                        if (message.attachments.size >= 1) {
                            message.attachments.forEach(attachment => {
                                Logger.log("File name: " + attachment.name);
                                if (/\.(jpe?g|png|webp)$/.test(attachment.name)) {
                                    Logger.log("Match");
                                    options.image = {
                                        url: attachment.url
                                    };
                                }
                            });
                        }

                        options.author = {
                            name: message.author.tag,
                            icon_url: message.author.displayAvatarURL(),
                        };

                        await Logger.log("Options: " + options.image.url);

                        await Sender.sendFields(logChannel, [
                            'Action', `Message Deletion in ${message.channel}`,
                            'Content', message.content], options);
                    }
                }
            }
        }

    })().catch((err) => Logger.handleError(err));
});
