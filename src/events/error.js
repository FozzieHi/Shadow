const client = require('../singletons/client.js');

client.on('error', (err) => console.log(err));
