const patron = require('patron.js');

class General extends patron.Group {
    constructor() {
        super({
            name: 'general',
            description: 'The general commands, anyone can use.'
        });
    }
}

module.exports = new General();
