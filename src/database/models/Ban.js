class Ban {
    constructor(userId, guildId, banLength) {
        this.userId = userId;
        this.guildId = guildId;
        this.banLength = banLength;
        this.bannedAt = Date.now();
    }
}

module.exports = Ban;
