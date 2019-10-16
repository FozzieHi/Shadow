class Guild {
    constructor(guildId) {
        this.guildId = guildId;
        this.prefix = 's$';
        this.vanityURL = '';
        this.logMessages = false;
        this.logJoinLeave = false;
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
            messageLog: undefined,
            joinLeaveLog: undefined
        }
    }
}

module.exports = Guild;
