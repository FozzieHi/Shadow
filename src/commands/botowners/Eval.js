const patron = require('patron.js');
const db = require('../../database'); // lgtm [js/unused-local-variable]
const util = require('util');
const Configuration = require('../../utils/Configuration.js');
const discord = require('discord.js'); // lgtm [js/unused-local-variable]

class Eval extends patron.Command {
    constructor() {
        super({
            names: ['eval'],
            groupName: 'botowners',
            description: 'Evaluate JavaScript code.',
            guildOnly: false,
            args: [
                new patron.Argument({
                    name: 'code',
                    key: 'code',
                    type: 'string',
                    example: 'client.token',
                    remainder: true
                })
            ]
        });
    }

    async run(msg, args) {
        try {
            const client = msg.client;

            if (args.code.includes(".token")) {
                return msg.sender.reply('You cannot access the client token using the eval command.', { color: Configuration.errorColour });
            }

            let result = eval(args.code);

            if (result.then !== undefined) {
                result = await result;
            }

            if (typeof result !== 'string') {
                result = util.inspect(result, { depth: 0 });
            }

            result = result.replace(client.token, '[Redacted]').replace(/\[Object\]/g, 'Object').replace(/\[Array\]/g, 'Array');

            return msg.sender.sendFields(['Eval', '```js\n' + args.code + '```', 'Returns', '```js\n' + result + '```']);
        } catch (err) {
            return msg.sender.sendFields(['Eval', '```js\n' + args.code + '```', 'Error', '```js\n' + err + '```'], { color: Configuration.errorColour });
        }
    }
}

module.exports = new Eval();
