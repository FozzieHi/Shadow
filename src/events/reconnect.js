const client = require('../singletons/client.js');
const Logger = require('../utils/Logger.js');

client.on('reconnect', () => {
    return Logger.log('Attempting to reconnect...', 'INFO');
});
