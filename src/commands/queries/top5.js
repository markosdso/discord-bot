const { ApplicationCommandOptionType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Ranking = require('../../models/ranking');

module.exports = {
    name: 'top5',
    description: 'display top 5 coasters of calling user',

    callback: async (client, interaction) => {
        try {

            let output = '';

            const rankings = await Ranking.findAll({ 
                where: {id: interaction.user.id},
                limit: 5, 
                order: [
                    ['rank', 'ASC']
                ]
            });

            for (ranking of rankings) {
                output += ranking.rank + ". " + ranking.name + ", " + ranking.park + "\n";
            }

            interaction.reply(`${output}`);


        } catch (error) {
            interaction.reply(`ERROR: ${error}`);
        }

    }
}