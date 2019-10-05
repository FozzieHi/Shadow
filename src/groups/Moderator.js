const patron = require('patron.js');

class Moderator extends patron.Group {
    constructor() {
        super({
            name: 'moderator',
            preconditions: ['moderator']
        });
    }
}

module.exports = new Moderator();
