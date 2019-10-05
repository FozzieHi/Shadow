const MongoClient = require('mongodb').MongoClient;
const UserRepository = require('../repositories/UserRepository.js');
const GuildRepository = require('../repositories/GuildRepository.js');
const MuteRepository = require('../repositories/MuteRepository.js');

class Database {
    constructor() {
        this.queries = {
            Guild: require('../queries/GuildQuery.js'),
            Id: require('../queries/IdQuery.js'),
            User: require('../queries/UserQuery.js'),
            Mute: require('../queries/MuteQuery.js')
        };

        this.updates = {
            Pull: require('../updates/PullUpdate.js'),
            Push: require('../updates/PushUpdate.js')
        };

        this.models = {
            Guild: require('../models/Guild.js'),
            User: require('../models/User.js'),
            Mute: require('../models/Mute.js')
        };
    }

    async connect(connectionURL) {
        const db = await MongoClient.connect(connectionURL);

        this.guildRepo = new GuildRepository(await db.createCollection('guilds'));
        this.userRepo = new UserRepository(await db.createCollection('users'));
        this.muteRepo = new MuteRepository(await db.createCollection('mutes'));

        await db.collection('guilds').createIndex('guildId', { unique: true });
    }
}

module.exports = Database;
