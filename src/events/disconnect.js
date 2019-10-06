const client = require('../singletons/client.js');
const Logger = require('../utils/Logger.js');

client.on('disconnect', () => {
    return Logger.log('Shadow has disconnected.', 'INFO');
});
