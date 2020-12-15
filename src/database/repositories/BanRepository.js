const BaseRepository = require('./BaseRepository.js');
const UserQuery = require('../queries/UserQuery.js');
const Ban = require('../models/Ban.js');

class BanRepository extends BaseRepository {
    anyBan(userId, guildId) {
        return this.any(new UserQuery(userId, guildId));
    }

    insertBan(userId, guildId, banLength) {
        return this.insertOne(new Ban(userId, guildId, banLength));
    }

    findBan(userId, guildId) {
        return this.find(new UserQuery(userId, guildId));
    }

    deleteBan(userId, guildId) {
        return this.deleteOne(new UserQuery(userId, guildId));
    }
}

module.exports = BanRepository;
