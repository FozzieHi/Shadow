const discord = require('discord.js');
module.exports = new discord.Client({ fetchAllMembers: true, messageCacheMaxSize: 100, messageCacheLifetime: 30, messageSweepInterval: 1800 });
