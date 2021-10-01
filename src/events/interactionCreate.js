const client = require('../singletons/client.js');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId.startsWith('userid')) {
            const userId = interaction.customId.split('userid-')[1];
            return interaction.reply({content: userId, ephemeral: true});
        }
    }
}
