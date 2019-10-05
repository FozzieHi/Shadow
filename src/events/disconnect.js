const client = require('../singletons/client.js');

client.on('disconnect', () => {
    return console.log('Shadow has disconnected.');
});
