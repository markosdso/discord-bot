const { ApplicationCommandOptionType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Rollercoaster = require('../../models/rollercoaster');

module.exports = {
    name: 'input',
    description: 'input a rollercoaster',
    options: [
        {
            name: 'name',
            description: 'rollercoaster name',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'park',
            description: 'amusement park',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'manufacturer',
            description: 'rollercoaster manufacturer',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'model',
            description: 'rollercoaster model',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'country',
            description: 'country',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'seating',
            description: 'seating arrangement',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'type',
            description: 'material of track/supports',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'height',
            description: 'height in feet',
            type: ApplicationCommandOptionType.Integer
        },
        {
            name: 'speed',
            description: 'speed in miles per hour',
            type: ApplicationCommandOptionType.Number
        },
        {
            name: 'length',
            description: 'length in feet',
            type: ApplicationCommandOptionType.Integer
        },
        {
            name: 'inversions',
            description: 'number of inversions',
            type: ApplicationCommandOptionType.Integer
        },
        {
            name: 'image',
            description: 'link to image of rollercoaster',
            type: ApplicationCommandOptionType.String
        }
    ],

    callback: async (client, interaction) => {
        try {
            const name = interaction.options.get('name').value;
            const park = interaction.options.get('park').value;
            const manufacturer = interaction.options.get('manufacturer').value;
            const model = interaction.options.get('model').value;
            const country = interaction.options.get('country').value;
            const seating = interaction.options.get('seating').value;
            const type = interaction.options.get('type').value;
            const height = interaction.options.get('height').value;
            const speed = interaction.options.get('speed').value;
            const length = interaction.options.get('length').value;
            const inversionCount = interaction.options.get('inversions').value;
            const imgSrc = interaction.options.get('image').value;

            const rollercoaster = await Rollercoaster.create({
                name: name,
                park: park,
                manufacturer: manufacturer,
                model: model,
                country: country,
                seating: seating,
                type: type,
                height: height,
                speed: speed,
                length: length,
                inversionCount: inversionCount,
                imgSrc: imgSrc
            });

            const embed = new EmbedBuilder()
                .setColor('DarkOrange')
                .setTitle(`${name} added!`)
                .setThumbnail(`${imgSrc}`);

            interaction.reply({ embeds: [embed]});
            
        } catch (error) {
            interaction.reply(`ERROR: ${error}`);
        }

    }
}

//name, park, manufacturer, model, country, seating, type, height, speed, length, inversion count, opening date, image source