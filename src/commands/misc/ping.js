const { InteractionCallback } = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'Pings calling user.',

    callback: (client, interaction) => {
        interaction.reply(`${interaction.user}`);
    }
}