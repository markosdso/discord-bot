const { ApplicationCommandOptionType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Rollercoaster = require('../../models/rollercoaster');
const Sequelize = require('sequelize');

module.exports = {
    name: 'coaster',
    description: 'display data on rollercoaster',
    options: [
        {
            name: 'name',
            description: 'rollercoaster and park name',
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true,
        },
    ],

    autocomplete: async (client, interaction) => {
        try {
            const focusedValue = interaction.options.getFocused();

            const filteredChoices = await Rollercoaster.findAll({
                attributes: ['name', 'park'],
                limit: 5,
                where: {
                    name: {
                        [Sequelize.Op.like]: focusedValue + "%",
                    }
                }
            });

            const results = filteredChoices.map((choice) => {
                return {
                    name: `${choice.name}, ${choice.park}`,
                    value: `${choice.name}, ${choice.park}`
                }
            });

            interaction.respond(results).catch(() => {});



        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    },

    callback: async (client, interaction) => {
        try {
            const composite = interaction.options.get('name').value;

            const split = composite.split(", ");
            const name = split[0];
            const park = split[1];
    
            const rollercoaster = await Rollercoaster.findOne({ 
                where: { 
                    name: name, 
                    park: park,
                } 
            });
    
            if(!rollercoaster) {
                interaction.reply("Rollercoaster not found");
                return;
            }

            const embed = new EmbedBuilder()
                .setColor('DarkOrange')
                .setTitle(`${rollercoaster.name}`)
                .setDescription(`${rollercoaster.park}`)
                .addFields(
                    { name: 'Manufacturer:', value: `${rollercoaster.manufacturer}` },
                    { name: 'Model:', value: `${rollercoaster.model}`, inline: true},
                    { name: 'Country:', value: `${rollercoaster.country}`, inline: true },
                    { name: 'Seating:', value: `${rollercoaster.seating}`, inline: true },
                    { name: 'Type:', value: `${rollercoaster.type}`, inline: true },
                    { name: 'Height:', value: `${rollercoaster.height} ft`, inline: true },
                    { name: 'Speed:', value: `${rollercoaster.speed} mph`, inline: true },
                    { name: 'Length', value: `${rollercoaster.length} ft`, inline: true },
                    { name: 'Inversion #:', value: `${rollercoaster.inversionCount}`, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true},
                )
                .setImage(`${rollercoaster.imgSrc}`);


            interaction.reply({ embeds: [embed]});


        } catch (error) {
            interaction.reply(`ERROR: ${error}`);
        }

    }
}