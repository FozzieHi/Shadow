const discord = require('discord.js');
const Configuration = require('../utils/Configuration.js');

module.exports = new discord.Client({ fetchAllMembers: true, messageCacheMaxSize: 450, messageCacheLifetime: 86400, messageSweepInterval: 200, disabledEvents: Configuration.disabledEvents });
