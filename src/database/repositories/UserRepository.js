const BaseRepository = require('./BaseRepository.js');
const UserQuery = require('../queries/UserQuery.js');
const User = require('../models/User.js');

class UserRepository extends BaseRepository {
    anyUser(userId, guildId) {
        return this.any(new UserQuery(userId, guildId));
    }

    async getUser(userId, guildId) {
        const query = new UserQuery(userId, guildId);
        const fetchedUser = await this.findOne(query, guildId);

        return fetchedUser != null ? fetchedUser : await this.findOneAndReplace(query, new User(userId, guildId));
    }

    updateUser(userId, guildId, update) {
        return this.updateOne(new UserQuery(userId, guildId), update);
    }

    findUserAndUpdate(userId, guildId, update) {
        return this.findOneAndUpdate(new UserQuery(userId, guildId), update);
    }

    async upsertUser(userId, guildId, update) {
        if (await this.anyUser(userId, guildId)) {
            return this.updateUser(userId, guildId, update);
        }

        return this.updateOne(new User(userId, guildId), update, true);
    }

    async findUserAndUpsert(userId, guildId, update) {
        if (await this.anyUser(userId, guildId)) {
            return this.findUserAndUpdate(userId, guildId, update);
        }

        return this.findOneAndUpdate(new User(userId, guildId), update, true);
    }

    deleteUser(userId, guildId) {
        return this.deleteOne(new UserQuery(userId, guildId));
    }

    deleteUsers(guildId) {
        return this.deleteMany({ guildId: guildId });
    }
}

module.exports = UserRepository;
