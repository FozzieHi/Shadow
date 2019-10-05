const patron = require('patron.js');

class GuildOwner extends patron.Group {
    constructor() {
        super({
            name: 'guildowner',
            preconditions: ['guildowner']
        });
    }
}

module.exports = new GuildOwner();
