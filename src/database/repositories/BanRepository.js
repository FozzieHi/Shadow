const BaseRepository = require('./BaseRepository.js');
const BanQuery = require('../queries/BanQuery.js');
const Ban = require('../models/Ban.js');

class BanRepository extends BaseRepository {
    anyBan(userId, guildId) {
        return this.any(new BanQuery(userId, guildId));
    }

    insertBan(userId, guildId, banLength) {
        return this.insertOne(new Ban(userId, guildId, banLength));
    }

    findBan(userId, guildId) {
        return this.find(new BanQuery(userId, guildId));
    }

    deleteBan(userId, guildId) {
        return this.deleteOne(new BanQuery(userId, guildId));
    }
}

module.exports = BanRepository;
