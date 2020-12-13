class User {
    constructor(userId, guildId) {
        this.userId = userId;
        this.guildId = guildId;
        this.punishmentId = 1;
        this.punishments = [];
        this.automod = {
            advertisementCount: 0,
            advertisementStart: 0
        }
    }
}

module.exports = User;
