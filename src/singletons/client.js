const discord = require('discord.js');
const Configuration = require('../utils/Configuration.js');

module.exports = new discord.Client({ fetchAllMembers: true, messageCacheMaxSize: 300, messageCacheLifetime: 7200, messageSweepInterval: 7200, disabledEvents: Configuration.disabledEvents });
