class User {
    constructor(userId, guildId) {
        this.userId = userId;
        this.guildId = guildId;
        this.punishmentId = 1;
        this.punishments = [];
    }
}

module.exports = User;
