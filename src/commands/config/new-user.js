const { ApplicationCommandOptionType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const User = require('../../models/user');

module.exports = {
    name: 'new-user',
    description: 'create your user profile',
    options: [
        {
            name: 'name',
            description: 'rollercoaster name',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'description',
            description: 'a quick "about you" blurb',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'home-park',
            description: 'your home park',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'fav-manufacturer',
            description: 'your favourite manufacturer',
            type: ApplicationCommandOptionType.String,
            required: true
        },

    ],

    callback: async (client, interaction) => {
        try {
            const name = interaction.options.get('name').value;
            const description = interaction.options.get('description').value;
            const homePark = interaction.options.get('home-park').value;
            const favManufacturer = interaction.options.get('fav-manufacturer').value;

            const id = interaction.user.id;
            const tag = interaction.user.tag;

            const user = await User.create({
                id: id,
                name: name,
                tag: tag,
                description: description,
                homePark: homePark,
                favManufacturer: favManufacturer
            });

            const embed = new EmbedBuilder()
                .setColor('DarkOrange')
                .setTitle('Profile added successfully!');

            interaction.reply({ embeds: [embed]});
            
        } catch (error) {
             interaction.reply(`ERROR: ${error}`);
        }

    }
}

//id, name, tag, description, home park, favourite manufacturer