const discord = require('discord.js');
const Configuration = require('../utils/Configuration.js');

module.exports = new discord.Client({ fetchAllMembers: true, messageCacheMaxSize: 750, messageCacheLifetime: 172800, messageSweepInterval: 300, disabledEvents: Configuration.disabledEvents });
