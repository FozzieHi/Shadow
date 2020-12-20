const client = require('../singletons/client.js');
const Logger = require('../utils/Logger.js');

client.on('rateLimit', async (rateLimitInfo) => {
    return Logger.log("Rate Limit - " + rateLimitInfo, 'INFO');
});
