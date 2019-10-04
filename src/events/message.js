const client = require('../singletons/client.js');
const registry = require('../singletons/registry.js');
const patron = require('patron.js');
const Sender = require('../utils/Sender.js');
const {Handler} = require('patron.js');
const handler = new Handler({registry});
const Configuration = require('../utils/Configuration.js');

client.on('message', (msg) => {
    (async () => {
        if (msg.author.bot) {
            return;
        }

        const prefix = ';';
        const sender = new Sender(msg);

        if (/^;/.test(msg.content)) {
            const result = await handler.run(msg, 1);

            if (!result.success) {
                let message;

                if (result.commandError === patron.CommandError.InvalidArgCount) {
                    message = 'You must provide all required<> arguments.\n**Usage:** `' + prefix + result.command.getUsage() + '`\n**Example:** `' + prefix + result.command.getExample() + '`';
                } else {
                    message = result.errorReason;
                }
                return sender.reply(message, { color: Configuration.errorColour });
            }
        }

    })().catch((err) => {
        console.log(err);
    })
});
