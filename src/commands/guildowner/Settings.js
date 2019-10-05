const patron = require('patron.js');
const MenuService = require('../../services/MenuService.js');

class Settings extends patron.Command {
    constructor() {
        super({
            names: ['settings'],
            groupName: 'guildowner',
            description: 'View the Guild settings.'
        });
    }

    async run(msg, args, sender) {
        return MenuService.spawnSettingsMain(msg, msg.dbGuild, msg.author.id);
    }
}

module.exports = new Settings();
