class Guild {
    constructor(guildId) {
        this.guildId = guildId;
        this.prefix = 's$';
        this.autoMod = {
            mention: false,
            mentionLimit: 24,
            antiad: false
        };
        this.roles = {
            mod: [],
            muted: undefined
        };
        this.pages = {
            settings: [],
            autoMod: [],
        };
        this.channels = {
            log: undefined
        }
    }
}

module.exports = Guild;
