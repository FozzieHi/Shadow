const BaseRepository = require('./BaseRepository.js');
const UserQuery = require('../queries/UserQuery.js');
const Mute = require('../models/Mute.js');

class MuteRepository extends BaseRepository {
    anyMute(userId, guildId) {
        return this.any(new UserQuery(userId, guildId));
    }

    insertMute(userId, guildId, muteLength) {
        return this.insertOne(new Mute(userId, guildId, muteLength));
    }

    findMute(userId, guildId) {
        return this.find(new UserQuery(userId, guildId));
    }

    deleteMute(userId, guildId) {
        return this.deleteOne(new UserQuery(userId, guildId));
    }
}

module.exports = MuteRepository;
