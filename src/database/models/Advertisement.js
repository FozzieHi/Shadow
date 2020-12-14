class Advertisement {
    constructor(userId, guildId) {
        this.userId = userId;
        this.guildId = guildId;
        this.advertisementStart = Date.now();
    }
}

module.exports = Advertisement;
