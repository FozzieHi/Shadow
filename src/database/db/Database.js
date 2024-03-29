const MongoClient = require('mongodb').MongoClient;
const UserRepository = require('../repositories/UserRepository.js');
const GuildRepository = require('../repositories/GuildRepository.js');
const MuteRepository = require('../repositories/MuteRepository.js');
const BanRepository = require('../repositories/BanRepository.js');

let connection;

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
        };
    }

    async connect(connectionURL, dbName) {
        connection = await MongoClient.connect(connectionURL);
        const db = connection.db(dbName);

        this.guildRepo = new GuildRepository(await db.collection('guilds'));
        this.userRepo = new UserRepository(await db.collection('users'));
        this.muteRepo = new MuteRepository(await db.collection('mutes'));
        this.banRepo = new BanRepository(await db.collection('bans'));

        await db.collection('guilds').createIndex('guildId', { unique: true });
    }

    async close() {
        connection.close();
    }
}

module.exports = Database;
