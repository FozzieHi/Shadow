const discord = require('discord.js');
module.exports = new discord.Client({ fetchAllMembers: true, messageCacheMaxSize: 300, messageCacheLifetime: 60, messageSweepInterval: 3600 });
