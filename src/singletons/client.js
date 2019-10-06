const discord = require('discord.js');
const Configuration = require('../utils/Configuration.js');

module.exports = new discord.Client({ fetchAllMembers: true, messageCacheMaxSize: 300, messageCacheLifetime: 3600, messageSweepInterval: 3600, disabledEvents: Configuration.disabledEvents });
