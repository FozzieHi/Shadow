const discord = require('discord.js');
const Configuration = require('../utils/Configuration.js');

module.exports = new discord.Client({ makeCache: Configuration.cacheOptions, intents: Configuration.intents, partials: Configuration.partials });
