const path = require('path');
const RequireAll = require('patron.js').RequireAll;

class IntervalService {
    startService() {
        const obje = RequireAll(path.join(__dirname, '../intervals'));
    }
}

module.exports = new IntervalService();
