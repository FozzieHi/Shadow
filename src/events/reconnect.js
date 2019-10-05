const client = require('../singletons/client.js');

client.on('reconnect', () => {
    return console.log('Attempting to reconnect...');
});
