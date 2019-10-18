const client = require('../singletons/client.js');
const registry = require('../singletons/registry.js');
const patron = require('patron.js');
const db = require('../database/index.js');
const Sender = require('../utils/Sender.js');
const {Handler} = require('patron.js');
const handler = new Handler({registry});
const Configuration = require('../utils/Configuration.js');
const AutoModerationService = require('../services/AutoModerationService.js');
const discord = require('discord.js');
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

                switch (result.commandError) {
                    case patron.CommandError.UnknownCmd:
                        return;
                    case patron.CommandError.InvalidArgCount:
                        message = 'You must provide all required<> arguments.\n**Usage:** `' + prefix + result.command.getUsage() + '`\n**Example:** `' + prefix + result.command.getExample() + '`';
                        break;
                    case patron.CommandError.Exception:
                        if (result.error instanceof discord.DiscordAPIError) {
                            if (result.error.code === 0 || result.error.code === 404 || result.error.code === 40001 || result.error.code === 50001 || result.error.code === 50013 || result.error.code === 403) {
                                message = `I do not have permission to do that (${result.error.code})`;
                            } else if (result.error.code === 50007) {
                                message = `I do not have permission to DM that user.`;
                            } else if (result.error.code >= 500 && result.error.code < 600) {
                                message = 'Discord Internal Server error, check Discord\'s [status](https://status.discordapp.com/).';
                            } else {
                                message = result.errorReason;
                            }
                        } else {
                            message = result.errorReason;
                            await Logger.handleError(result.error);
                        }
                        break;
                    default:
                        message = result.errorReason;
                }

                return sender.reply(message, { color: Configuration.errorColour });
            }
        }

    })().catch((err) => Logger.handleError(err));
});
