const MongoClient = require('mongodb').MongoClient;
const UserRepository = require('../repositories/UserRepository.js');
const GuildRepository = require('../repositories/GuildRepository.js');
const MuteRepository = require('../repositories/MuteRepository.js');
const BanRepository = require('../repositories/BanRepository.js');
const AdvertisementRepository = require('../repositories/AdvertisementRepository.js');

class Database {
    constructor() {
        this.queries = {
            Guild: require('../queries/GuildQuery.js'),
            Id: require('../queries/IdQuery.js'),
            User: require('../queries/UserQuery.js')
        };

        this.updates = {
            Pull: require('../updates/PullUpdate.js'),
            Push: require('../updates/PushUpdate.js')
        };

        this.models = {
            Guild: require('../models/Guild.js'),
            User: require('../models/User.js'),
            Mute: require('../models/Mute.js'),
            Ban: require('../models/Ban.js'),
            Advertisement: require('../models/Advertisement.js')
        };
    }

    async connect(connectionURL) {
        const db = await MongoClient.connect(connectionURL);

        this.guildRepo = new GuildRepository(await db.createCollection('guilds'));
        this.userRepo = new UserRepository(await db.createCollection('users'));
        this.muteRepo = new MuteRepository(await db.createCollection('mutes'));
        this.banRepo = new BanRepository(await db.createCollection('bans'));
        this.advertisementRepo = new AdvertisementRepository(await db.createCollection('advertisements'));

        await db.collection('guilds').createIndex('guildId', { unique: true });
    }
}

module.exports = Database;
