const Configuration = require('../utils/Configuration.js');
const client = require('../singletons/client.js');
const db = require('../database/index.js');
const Sender = require('../utils/Sender.js');
const MenuService = require('../services/MenuService.js');
const StringUtils = require('../utils/StringUtils.js');
const WorkerService = require('../services/WorkerService.js');
const request = require('request');

client.on('messageReactionAdd', async (messageReaction, user) => {
    if (user.bot) {
        return;
    }
    const msg = messageReaction.message;
    const dbGuild = await db.guildRepo.getGuild(msg.guild.id);
    const reaction = messageReaction.emoji.name;
    const sender = new Sender(msg);

    // Main settings.
    for (let i = 0; i < dbGuild.pages.settings.length; i++) {
        if (msg.id === dbGuild.pages.settings[i].id && user.id === dbGuild.pages.settings[i].user) {
            if (reaction === '🇵') { // Change prefix.
                const filter = m => m.author.id === user.id;
                sender.send('What would you like the new Prefix to be?');
                const newPrefix = await msg.channel.awaitMessages(filter, { max: 1 });
                await sender.send('Successfully set the Bot Prefix to ' + newPrefix.first().content);
                return db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'prefix': newPrefix.first().content } });
            }
            if (reaction === '📎') { // Set vanity URL.
                const filter = m => m.author.id === user.id;
                if (StringUtils.isNullOrWhiteSpace(dbGuild.vanityURL)) {
                    sender.send('What would you like your vanity URL to be?');
                    const newVanityURL = await msg.channel.awaitMessages(filter, {max: 1});
                    if (newVanityURL.first().content.trim().length < 2) {
                        return sender.send('The vanity URL name must be at least 2 characters long.');
                    }
                    const options = {
                        url: 'https://vanity.shdw.cc',
                        method: 'GET',
                        headers: {
                            'Vanity-URL': newVanityURL.first().content,
                        }
                    };
                    request(options, async function (err, res, body) {
                        if (!StringUtils.isNullOrWhiteSpace(body)) {
                            return sender.send('That vanity URL is already taken.', { color: Configuration.errorColour });
                        }
                        sender.send('What channel would you like your invite code to invite to?');
                        const inviteChannel = await msg.channel.awaitMessages(filter, {max: 1});
                        const channel = msg.guild.channels.find(channel => channel.name === inviteChannel.first().content);
                        if (channel === undefined || channel === null) {
                            return sender.send('Could not find Text Channel #' + inviteChannel.first().content);
                        }
                        const inviteCode = await channel.createInvite({maxAge: 0, reason: 'Shadow vanity URL.'});
                        await WorkerService.addURL(newVanityURL.first().content, inviteCode.code);
                        await db.guildRepo.upsertGuild(msg.guild.id, {$set: {'vanityURL': newVanityURL.first().content}});
                        return sender.send(`${msg.guild.name}'s invite link is now available at https://shdw.cc/i/` + newVanityURL.first().content);
                    });
                } else {
                    sender.send('You currently already have https://shdw.cc/i/' + dbGuild.vanityURL + ' active, would you like to replace it?');
                    const response = await msg.channel.awaitMessages(filter, {max: 1});
                    if (response.first().content === "yes" || response.first().content === "y" || response.first().content === "ya") {
                        sender.send('What would you like your vanity URL to be?');
                        const newVanityURL = await msg.channel.awaitMessages(filter, {max: 1});
                        if (newVanityURL.first().content.trim().length < 2) {
                            return sender.send('The vanity URL name must be at least 2 characters long.');
                        }
                        const options = {
                            url: 'https://vanity.shdw.cc',
                            method: 'GET',
                            headers: {
                                'Vanity-URL': newVanityURL.first().content,
                            }
                        };
                        request(options, async function (err, res, body) {
                            if (!StringUtils.isNullOrWhiteSpace(body)) {
                                return sender.send('That vanity URL is already taken.', { color: Configuration.errorColour });
                            }
                            sender.send('What channel would you like your invite code to invite to?');
                            const inviteChannel = await msg.channel.awaitMessages(filter, {max: 1});
                            const channel = msg.guild.channels.find(channel => channel.name === inviteChannel.first().content);
                            if (channel === undefined || channel === null) {
                                return sender.send('Could not find Text Channel #' + inviteChannel.first().content);
                            }
                            const inviteCode = await channel.createInvite({maxAge: 0, reason: 'Shadow vanity URL.'});
                            await WorkerService.deleteURL(dbGuild.vanityURL);
                            await WorkerService.addURL(newVanityURL.first().content, inviteCode.code);
                            await db.guildRepo.upsertGuild(msg.guild.id, {$set: {'vanityURL': newVanityURL.first().content}});
                            return sender.send(`${msg.guild.name}'s invite link is now available at https://shdw.cc/i/` + newVanityURL.first().content);
                        });
                    } else {
                        return sender.send('Vanity URL setup cancelled.');
                    }
                }
            }
            if (reaction === '🙉') { // Set muted role.
                const filter = m => m.author.id === user.id;
                sender.send('What would you like the Muted role to be?');
                const mutedRole = await msg.channel.awaitMessages(filter, { max: 1 });
                const role = await msg.guild.roles.find(role => role.name === mutedRole.first().content);
                if (role === undefined || role === null) {
                    return sender.send('Could not find the role ' + mutedRole.first().content);
                }
                await sender.send('Successfully set the Muted role to ' + role.toString());
                return db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'roles.muted': role.id } });
            }
            if (reaction === '📖') { // Change log channel.
                const filter = m => m.author.id === user.id;
                sender.send('What would you like the new Logging Channel to be?');
                const newChannel = await msg.channel.awaitMessages(filter, { max: 1 });
                const channel = msg.guild.channels.find(channel => channel.name === newChannel.first().content);
                if (channel === undefined || channel === null) {
                    return sender.send('Could not find Text Channel #' + newChannel.first().content);
                }
                await sender.send('Successfully set ' + channel.name + ' as the logging channel.');
                return db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'channels.log': channel.id } });
            }
            if (reaction === '🔄') { // Toggle message logging.
                const updated = !dbGuild.logMessages;
                await db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'logMessages': (dbGuild.logMessages === undefined ? true : updated) } });
                let channel = msg.guild.channels.get(dbGuild.channels.messageLog);
                if (updated && dbGuild.channels.messageLog === undefined || channel === undefined) {
                    const filter = m => m.author.id === user.id;
                    await sender.send('What would you like the channel to log message edits/deletes be?');
                    const newChannel = await msg.channel.awaitMessages(filter, { max: 1 });
                    const channel = msg.guild.channels.find(channel => channel.name === newChannel.first().content);
                    if (channel === undefined || channel === null) {
                        return sender.send('Could not find Text Channel #' + newChannel.first().content);
                    }
                    await sender.send('Successfully set ' + channel.name + ' as the message logging channel and enabled message logging.');
                    return db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'channels.messageLog': channel.id } });
                }
            }
            if (reaction === '🖊') { // Change message logging channel.
                const filter = m => m.author.id === user.id;
                await sender.send('What would you like the channel to log message edits/deletes to be?');
                const newChannel = await msg.channel.awaitMessages(filter, { max: 1 });
                const channel = msg.guild.channels.find(channel => channel.name === newChannel.first().content);
                if (channel === undefined || channel === null) {
                    return sender.send('Could not find Text Channel #' + newChannel.first().content);
                }
                await sender.send('Successfully set ' + channel.name + ' as the message logging channel.');
                return db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'channels.messageLog': channel.id } });
            }
            if (reaction === '👋') { // Toggle join leave logging.
                const updated = !dbGuild.logJoinLeave;
                await db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'logJoinLeave': (dbGuild.logJoinLeave === undefined ? true : updated) } });
                let channel = msg.guild.channels.get(dbGuild.channels.joinLeaveLog);
                if (updated && dbGuild.channels.joinLeaveLog === undefined || channel === undefined) {
                    const filter = m => m.author.id === user.id;
                    await sender.send('What would you like the channel to log join/leaves to be?');
                    const newChannel = await msg.channel.awaitMessages(filter, { max: 1 });
                    const channel = msg.guild.channels.find(channel => channel.name === newChannel.first().content);
                    if (channel === undefined || channel === null) {
                        return sender.send('Could not find Text Channel #' + newChannel.first().content);
                    }
                    await sender.send('Successfully set ' + channel.name + ' as the join/leave logging channel and enabled join/leave logging.');
                    return db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'channels.joinLeaveLog': channel.id } });
                }
            }
            if (reaction === '✍') { // Change join/leave logging channel.
                const filter = m => m.author.id === user.id;
                await sender.send('What would you like the channel to log join/leaves to be?');
                const newChannel = await msg.channel.awaitMessages(filter, { max: 1 });
                const channel = msg.guild.channels.find(channel => channel.name === newChannel.first().content);
                if (channel === undefined || channel === null) {
                    return sender.send('Could not find Text Channel #' + newChannel.first().content);
                }
                await sender.send('Successfully set ' + channel.name + ' as the join/leave logging channel.');
                return db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'channels.joinLeaveLog': channel.id } });
            }
            if (reaction === '⚒') { // Auto Mod.
                return MenuService.spawnAutoMod(msg, dbGuild, user.id);
            }
            if (reaction === '✏') { // Reset Guild data.
                await sender.send('Are you sure you wish to reset all Shadow guild related data within your server? Reply with "yes" to continue.');

                const filter = (x) => x.content.toLowerCase() === 'yes' && x.author.id === user.id;
                const result = await msg.channel.awaitMessages(filter, { max: 1, time: 30000 });

                if (result.size === 1) {
                    await sender.send('Successfully reset your Guild\'s Shadow data.');
                    await WorkerService.deleteURL(dbGuild.vanityURL);
                    return db.guildRepo.deleteGuilds(msg.guild.id);
                }
            }
            if (reaction === '📝') { // Reset User data.
                await sender.send('Are you sure you wish to reset all Shadow user related data within your server? Reply with "yes" to continue.');

                const filter = (x) => x.content.toLowerCase() === 'yes' && x.author.id === user.id;
                const result = await msg.channel.awaitMessages(filter, { max: 1, time: 30000 });

                if (result.size === 1) {
                    await sender.send('Successfully reset all Shadow user data in your guild.');
                    return db.userRepo.deleteUsers(msg.guild.id);
                }
            }
            if (reaction === 'exitmenu') { // Exit.
                await msg.delete();
                return db.guildRepo.upsertGuild(msg.guild.id, new db.updates.Pull('pages.settings', { id: msg.id }));
            }
        }
    }

    // Auto mod settings.
    for (let i = 0; i < dbGuild.pages.autoMod.length; i++) {
        if (msg.id === dbGuild.pages.autoMod[i].id && user.id === dbGuild.pages.autoMod[i].user) {
            if (reaction === '⌨') {
                const protection = dbGuild.autoMod.mention;
                const mutedRole = msg.guild.roles.get(dbGuild.roles.muted);
                if (mutedRole === undefined || mutedRole === null) {
                    const filter = m => m.author.id === user.id;
                    await sender.send('You first have to set the Muted role, what role would you like it to be?');
                    const mutedRoleNew = await msg.channel.awaitMessages(filter, { max: 1 });
                    const role = await msg.guild.roles.find(role => role.name === mutedRoleNew.first().content);
                    if (role === undefined || role === null) {
                        return sender.send('Could not find the role ' + mutedRoleNew.first().content);
                    }
                    await sender.send('Successfully set the Muted role to ' + role.toString());
                    await db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'roles.muted': role.id } });
                }
                if (protection) {
                    await sender.send('Mention Spam Bot Protection has been disabled.', { color: Configuration.errorColour });
                    return db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'autoMod.mention': false } });
                }
                await sender.send('Mention Spam Bot Protection has been enabled.', { color: Configuration.greenColour });
                return db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'autoMod.mention': true } });
            }
            if (reaction === '🗒') {
                const filter = m => m.author.id === user.id;
                await sender.send('What would you like the Mention Spam Limit to be?');
                const getMessage = await msg.channel.awaitMessages(filter, { max: 1 });
                const mentionLimit = getMessage.first().content;
                if (isNaN(parseInt(mentionLimit))) {
                    return sender.send('You must specify a valid number.', { color: Configuration.errorColour });
                }
                if (parseInt(mentionLimit) >= 5 && parseInt(mentionLimit) <= 100) {
                    await sender.send('Successfully set the Mention Limit to ' + mentionLimit);
                    return db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'autoMod.mentionLimit': mentionLimit } });
                }
                return sender.reply('The number must be between 5 and 100', { color: Configuration.errorColour });
            }
            if (reaction === '🛑') {
                const protection = dbGuild.autoMod.antiad;
                if (protection) {
                    await sender.send('Advertising Protection has been disabled.', { color: Configuration.errorColour });
                    return db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'autoMod.antiad': false } });
                }
                await sender.send('Advertising Protection has been enabled.', { color: Configuration.greenColour });
                return db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'autoMod.antiad': true } });
            }
            if (reaction === '⬅') {
                await db.guildRepo.upsertGuild(msg.guild.id, new db.updates.Pull('pages.autoMod', { id: msg.id }));
                return MenuService.spawnSettingsMain(msg, dbGuild, user.id, 'edit');
            }
        }
    }
});
