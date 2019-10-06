class Guild {
    constructor(guildId) {
        this.guildId = guildId;
        this.prefix = 's$';
        this.logMessages = false;
        this.autoMod = {
            antiad: false,
            mention: false,
            mentionLimit: 14,
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
            log: undefined,
            messageLog: undefined
        }
    }
}

module.exports = Guild;
