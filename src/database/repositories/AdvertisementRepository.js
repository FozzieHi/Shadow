const BaseRepository = require('./BaseRepository.js');
const UserQuery = require('../queries/UserQuery.js');
const Advertisement = require('../models/Advertisement.js');

class AdvertisementRepository extends BaseRepository {
    anyAdvertisement(userId, guildId) {
        return this.any(new UserQuery(userId, guildId));
    }

    insertAdvertisement(userId, guildId) {
        return this.insertOne(new Advertisement(userId, guildId));
    }

    findAdvertisement(userId, guildId) {
        return this.find(new UserQuery(userId, guildId));
    }

    deleteAdvertisement(userId, guildId) {
        return this.deleteOne(new UserQuery(userId, guildId));
    }
}

module.exports = AdvertisementRepository;
