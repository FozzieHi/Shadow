const patron = require('patron.js');

const ownerIds = ["259745940972240896", "503105733701926922", "150707175214415872"];

class BotOwner extends patron.Precondition {
    constructor() {
        super({
            name: 'botowner'
        });
    }


    async run(command, msg) {
        if (ownerIds.some((v) => v === msg.author.id)) {
            return patron.PreconditionResult.fromSuccess();
        }
        return patron.PreconditionResult.fromError(command, 'You must be a Bot Owner in order to use this command.');
    }
}

module.exports = new BotOwner();
