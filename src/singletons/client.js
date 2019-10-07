const discord = require('discord.js');
const Configuration = require('../utils/Configuration.js');

module.exports = new discord.Client({ fetchAllMembers: true, messageCacheMaxSize: 500, messageCacheLifetime: 57600, messageSweepInterval: 300, disabledEvents: Configuration.disabledEvents });
