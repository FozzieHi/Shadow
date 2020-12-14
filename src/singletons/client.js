const discord = require('discord.js');
const Configuration = require('../utils/Configuration.js');

module.exports = new discord.Client({ fetchAllMembers: true, messageCacheMaxSize: 1500, messageCacheLifetime: 604800, messageSweepInterval: 200, ws: { intents: Configuration.intents }});
