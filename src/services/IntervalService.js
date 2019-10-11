const path = require('path');
const RequireAll = require('patron.js').RequireAll;

class IntervalService {
    startService() {
        RequireAll(path.join(__dirname, '../intervals'));
    }
}

module.exports = new IntervalService();
