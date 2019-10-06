const client = require('../singletons/client.js');
const Logger = require('../utils/Logger.js');

client.on('error', (err) => Logger.handleError(err));
