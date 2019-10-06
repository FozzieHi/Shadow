const client = require('../singletons/client.js');
const registry = require('../singletons/registry.js');
const patron = require('patron.js');
const db = require('../database/index.js');
const Sender = require('../utils/Sender.js');
const {Handler} = require('patron.js');
const handler = new Handler({registry});
const Configuration = require('../utils/Configuration.js');
const AutoModerationService = require('../services/AutoModerationService.js');
const Logger = require('../utils/Logger.js');

client.on('message', (msg) => {
    (async () => {
        if (msg.author.bot) {
            return;
        }

        let prefix = 's$';
        const sender = new Sender(msg);

        const inGuild = msg.guild !== null;

        msg.sender = sender;

        if (inGuild) {
            msg.dbUser = await db.userRepo.getUser(msg.author.id, msg.guild.id);
            msg.dbGuild = await db.guildRepo.getGuild(msg.guild.id);
            msg.dbGuild.prefix !== undefined ? prefix = msg.dbGuild.prefix : null;
            msg.dbGuild.autoMod.antiad ? await AutoModerationService.antiAdvertisingMsg(msg) : null;
            msg.dbGuild.autoMod.mention ? await AutoModerationService.antiMentionSpamMsg(msg) : null;
        }

        if (msg.content.startsWith(prefix)) {
            const result = await handler.run(msg, prefix.length);

            if (!result.success) {
                let message;

                if (result.commandError === patron.CommandError.UnknownCmd) {
                    return;
                }

                if (result.commandError === patron.CommandError.InvalidArgCount) {
                    message = 'You must provide all required<> arguments.\n**Usage:** `' + prefix + result.command.getUsage() + '`\n**Example:** `' + prefix + result.command.getExample() + '`';
                } else {
                    message = result.errorReason;
                }
                return sender.reply(message, { color: Configuration.errorColour });
            }
        }

    })().catch((err) => Logger.handleError(err));
});
