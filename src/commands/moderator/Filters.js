const patron = require('patron.js');
const db = require('../../database');
const StringUtils = require('../../utils/StringUtils.js');
const Configuration = require('../../utils/Configuration.js');

class Filters extends patron.Command {
    constructor() {
        super({
            names: ['filters'],
            groupName: 'moderator',
            description: 'Manage the word filters.',
            args: [
                new patron.Argument({
                    name: 'action',
                    key: 'action',
                    type: 'string',
                    example: 'add'
                }),
                new patron.Argument({
                    name: 'word',
                    key: 'word',
                    type: 'string',
                    example: 'example',
                    defaultValue: ''
                }),
                new patron.Argument({
                    name: 'channel',
                    key: 'channel',
                    type: 'textchannel',
                    example: '#general',
                    defaultValue: '',
                    remainder: true
                })
            ]
        });
    }

    async run(msg, args) {
        if (args.action.toLowerCase() !== 'add' && args.action.toLowerCase() !== 'remove' && args.action.toLowerCase() !== 'list') {
            return msg.sender.reply('Please provide an action of either `add`, `remove` or `list`.', { color: Configuration.errorColour });
        }

        if ((args.action.toLowerCase() === 'add' || args.action.toLowerCase() === 'remove') && StringUtils.isNullOrWhiteSpace(args.word)) {
            return msg.sender.reply('Please provide a word.', { color: Configuration.errorColour })
        }

        if (args.action.toLowerCase() === 'add') {
            await db.guildRepo.upsertGuild(msg.guild.id, new db.updates.Push('autoMod.filters', { word: args.word, channel: args.channel.id }));
            return msg.sender.reply('Successfully added ' + args.word + (args.channel !== '' ? ' for ' + args.channel.toString() : '') + ' to the filter.');
        } else if (args.action.toLowerCase() === 'remove') {
            await db.guildRepo.upsertGuild(msg.guild.id, new db.updates.Pull('autoMod.filters', { word: args.word, channel: args.channel.id }));
            return msg.sender.reply('Successfully removed ' + args.word + (args.channel !== '' ? ' for ' + args.channel.toString() : '') + ' from the filter.');
        } else if (args.action.toLowerCase() === 'list') {
            if (msg.dbGuild.autoMod.filters.length === 0) {
                return msg.sender.reply('No filtered words found.', { color: Configuration.errorColour });
            }

            let description = '';
            for (let i = 0; i < msg.dbGuild.autoMod.filters.length; i++) {
                const word = msg.dbGuild.autoMod.filters[i];

                description += word.word.toString() + ': ' + word.channel.toString() + '\n';
            }
            return msg.sender.reply(description, { title: 'Filtered Word List' });
        }
    }
}

module.exports = new Filters();
