const Embed = require('../structures/Embed.js');
const StringUtils = require('./StringUtils.js');
const NumericUtils = require('./NumericUtils.js');

class Sender {
    constructor(msg) {
        this.msg = msg;
    }

    dm(user, description, embedOptions = {}, messageOptions = {}) {
        return this.constructor.send(user, description, embedOptions, messageOptions);
    }

    reply(description, embedOptions = {}, messageOptions = {}) {
        return this.constructor.reply(this.msg, description, embedOptions, messageOptions);
    }

    send(description, embedOptions = {}, messageOptions = {}) {
        return this.constructor.send(this.msg.channel, description, embedOptions, messageOptions);
    }

    sendFields(fieldsAndValues, embedOptions = {}, messageOptions = {}) {
        return this.constructor.sendFields(this.msg.channel, fieldsAndValues, embedOptions, messageOptions);
    }

    static reply(msg, description, embedOptions = {}, messageOptions = {}) {
        return this.send(msg.channel, StringUtils.boldify(msg.author.tag) + ', ' + description, embedOptions, messageOptions);
    }

    static send(channel, description, embedOptions = {}, messageOptions = {}) {
        const descriptionType = typeof description;

        if (descriptionType === 'object') {
            embedOptions = description;
        } else if (descriptionType === 'string') {
            embedOptions.description = description;
        } else {
            throw new Error('The description must be an object or a string.');
        }

        messageOptions.embeds = [new Embed(embedOptions)];

        return channel.send(messageOptions);
    }

    static sendFields(channel, fieldsAndValues, embedOptions = {}, messageOptions = {}) {
        if (!NumericUtils.isEven(fieldsAndValues.length)) {
            throw new Error('The number of fields and values must be even.');
        }

        embedOptions.fields = [];

        for (let i = 0; i < fieldsAndValues.length - 1; i++) {
            if (NumericUtils.isEven(i)) {
                embedOptions.fields.push({ name: fieldsAndValues[i], value: fieldsAndValues[i + 1] });
            }
        }

        return this.send(channel, '', embedOptions, messageOptions);
    }
}

module.exports = Sender;
