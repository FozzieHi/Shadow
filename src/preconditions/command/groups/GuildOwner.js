const patron = require('patron.js');
const ModerationService = require('../../../services/ModerationService.js');

class GuildOwner extends patron.Precondition {
    constructor() {
        super({
            name: 'guildowner'
        });
    }

    async run(command, msg) {
        if (ModerationService.getPermLevel(msg.dbGuild(), msg.member) === 3) {
            return patron.PreconditionResult.fromSuccess();
        }

        return patron.PreconditionResult.fromError(command, 'You must be a Server Owner in order to use this command.');
    }
}

module.exports = new GuildOwner();
