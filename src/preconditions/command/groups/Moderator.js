const patron = require('patron.js');
const ModerationService = require('../../../services/ModerationService.js');

class Moderator extends patron.Precondition {
    constructor() {
        super({
            name: 'moderator'
        });
    }

    async run(command, msg) {
        if (ModerationService.getPermLevel(msg.dbGuild(), msg.member) >= 1) {
            return patron.PreconditionResult.fromSuccess();
        }

        return patron.PreconditionResult.fromError(command, 'You must be a Moderator in order to use this command.');
    }
}

module.exports = new Moderator();
