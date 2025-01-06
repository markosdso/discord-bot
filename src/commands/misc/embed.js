const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'sends an embed',

    callback: (client, interaction) => {
        const embed = new EmbedBuilder()
            .setTitle("Embed title")
            .setDescription("this is an embed description.")
            .setColor('DarkOrange')
            .addFields(
                {
                    name: 'Field title',
                    value: 'Some random value',
                },
                {
                    name: 'Second field title',
                    value: 'Another random value'
                }
            );
        interaction.reply({ embeds: [embed]});
    }
}