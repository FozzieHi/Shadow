const ModerationService = require('../../services/ModerationService.js');
const patron = require('patron.js');

class NoModerator extends patron.ArgumentPrecondition {
    constructor() {
        super({
            name: 'nomoderator'
        });
    }
    async run(command, msg, argument, args, value) {
        const member = msg.guild.members.get(value.id);
        if (member === undefined || member === null) { // If they are not a member they cannot be a Moderator.
            return patron.PreconditionResult.fromSuccess();
        }
        if (ModerationService.getPermLevel(msg.dbGuild, member) === 0) {
            return patron.PreconditionResult.fromSuccess();
        }

        return patron.PreconditionResult.fromError(command, 'You may not use this command on a Moderator.');
    }
}

module.exports = new NoModerator();
