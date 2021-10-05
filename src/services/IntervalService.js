const path = require('path');
const RequireAll = require('patron.js').RequireAll;

class IntervalService {
    async startService() {
        await RequireAll(path.join(__dirname, '../intervals'));
    }
}

module.exports = new IntervalService();
