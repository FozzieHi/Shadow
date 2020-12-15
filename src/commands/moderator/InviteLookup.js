const patron = require('patron.js');
const Configuration = require('../../utils/Configuration.js');
const client = require('../../singletons/client.js');

class InviteLookup extends patron.Command {
    constructor() {
        super({
            names: ['invitelookup', 'invite', 'invitefetch', 'fetchinvite', 'lookupinvite'],
            groupName: 'moderator',
            description: 'Lookup an invite code.',
            args: [
                new patron.Argument({
                    name: 'invite',
                    key: 'invite',
                    type: 'string',
                    example: 'QNh7QDx'
                })
            ]
        });
    }

    async run(msg, args) {
        const invite = await client.fetchInvite(`https://discord.gg/${args.invite}`);
        if (invite !== undefined) {
            const options = {
                title: `Invite Results for ${args.invite}`
            };
            options.thumbnail = {
                url: invite.guild.iconURL()
            };

            return msg.sender.sendFields([
                'Guild', invite.guild.name,
                'Members', invite.memberCount,
                'Online', invite.presenceCount,
                'Channel', invite.channel.toString(),
                'Inviter', (invite.inviter === undefined ? "Vanity Invite" : invite.inviter.tag)
            ], options);
        } else {
            return msg.sender.reply(`Could not resolve invite code ${args.invite}`, { color: Configuration.errorColour })
        }
    }
}

module.exports = new InviteLookup();
