const patron = require('patron.js');

class Clear extends patron.Precondition {
    constructor() {
        super({
            name: 'clear'
        });
    }

    async run(command, msg) {
        if (msg.channel.id === msg.dbGuild().channels.log) {
            return patron.PreconditionResult.fromError(command, 'You cannot clear messages in the logs channel.');
        }

        return patron.PreconditionResult.fromSuccess();
    }
}

module.exports = new Clear();
