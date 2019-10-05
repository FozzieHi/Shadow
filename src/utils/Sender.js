const Embed = require('./Embed.js');
const StringUtils = require('./StringUtils.js');
const NumericUtils = require('./NumericUtils.js');

class Sender {
    constructor(msg) {
        this.msg = msg;
    }

    dm(description, options, user = this.msg.author) {
        return this.constructor.send(user, description, options);
    }

    reply(description, options) {
        return this.constructor.reply(this.msg, description, options);
    }

    send(description, options) {
        return this.constructor.send(this.msg.channel, description, options);
    }

    static reply(msg, description, options) {
        return this.send(msg.channel, StringUtils.boldify(msg.author.tag) + ', ' + description, options);
    }

    static send(channel, description, options = {}) {
        const descriptionType = typeof description;

        if (descriptionType === 'object') {
            options = description;
        } else if (descriptionType === 'string') {
            options.description = description;
        } else {
            throw new Error('The description must be an object or a string.');
        }

        return channel.send({ embed: new Embed(options) });
    }

    static sendFields(channel, fieldsAndValues, options = {}) {
        if (!NumericUtils.isEven(fieldsAndValues.length)) {
            throw new Error('The number of fields and values must be even.');
        }

        options.fields = [];

        for (let i = 0; i < fieldsAndValues.length - 1; i++) {
            if (NumericUtils.isEven(i) === true) {
                options.fields.push({ name: fieldsAndValues[i], value: fieldsAndValues[i + 1] });
            }
        }

        return this.send(channel, options);
    }
}

module.exports = Sender;
