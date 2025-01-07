const { ApplicationCommandOptionType, ButtonStyle } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
const Ranking = require('../../models/ranking');
const User = require('../../models/user');
const Rollercoaster = require('../../models/rollercoaster');
const { QueryTypess, Sequelize } = require('sequelize');

module.exports = {
    name: 'rank',
    description: 'display top 5 coasters of calling user',
    options: [
        {
            name: 'id',
            description: 'user id',
            type: ApplicationCommandOptionType.User,
            required: 'true'
        },
        {
            name: 'where',
            description: 'variable in consideration',
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'park',
                    value: 'park'
                },
                {
                    name: 'manufacturer',
                    value: 'manufacturer',
                },
                {
                    name: 'model',
                    value: 'model',
                },
                {
                    name: 'country',
                    value: 'country'
                },
                {
                    name: 'seating',
                    value: 'seating'
                },
                {
                    name: 'type',
                    value: 'type'
                }
            ]
        },
        {
            name: 'is',
            description: 'value',
            type: ApplicationCommandOptionType.String,
        }
    ],

    callback: async (client, interaction) => {
        try {
            const backId = 'back'
            const forwardId = 'forward'
            const backButton = new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("⬅️")
                .setCustomId(backId);

            const forwardButton = new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("➡️")
                .setCustomId(forwardId);

            const id = interaction.options.get('id').value;

            const user = await User.findOne({ 
                where: { 
                    id: id
                } 
            });

            if (!user) {
                interaction.reply('User profile not registered');
                return;
            }

            let rankings;
            let subset = false;

            if (interaction.options.get('where') && interaction.options.get('is')) {
                subset = true;

                const attr = interaction.options.get('where').value;
                const cond = interaction.options.get('is').value;

                const filteredChoices = await Rollercoaster.findAll({
                    where: {
                        [attr]: cond,
                    }
                })

                let names = [];
                let parks = [];

                if (filteredChoices.length > 0){
                    names = filteredChoices.map((choice) => {
                        return choice.name;
                    });
    
                    parks = filteredChoices.map((choice) => {
                        return choice.park;
                    });
                }

                rankings = await Ranking.findAll({ 
                    where: {
                        id: id,
                        name: names,
                        park: parks,
                    },
                    order: [
                        ['rank', 'ASC']
                    ]
                });
                  

            } else {
                rankings = await Ranking.findAll({ 
                    where: {id: id},
                    order: [
                        ['rank', 'ASC']
                    ]
                });
            }


            const generateEmbed = async start => {
                const cur = rankings.slice(start, start + 10)

                curPage = Math.floor((start / 10) + 1);
                pageTotal = Math.ceil((rankings.length / 10))

                let output = '';
                let i = 0;
                for(let i = 0; i < cur.length; i++){
                    output += `${i + start + 1}. ${cur[i].name}, ${cur[i].park} \n`;
                }

                if (subset) {
                    output = "of " + interaction.options.get('is').value + "\n \n" + output;
                }

                const rollercoaster = await Rollercoaster.findOne({
                    where: {
                        name: cur[0].name,
                        park: cur[0].park,
                    },
                })

                return new EmbedBuilder()
                    .setTitle(`${user.name}'s (@${user.tag}) ranking\n 📄  (${curPage}/${pageTotal})`)
                    .setDescription(output)
                    .setColor('DarkOrange')
                    .setThumbnail(rollercoaster.imgSrc)
            }

            if (rankings.length == 0) {
                interaction.reply("No rollercoasters found with specified condition");
                return;
            }

            const canFitOnOnePage = rankings.length <= 10
            const embedMessage = await interaction.reply({
                embeds: [await generateEmbed(0)],
                components: canFitOnOnePage
                    ? []
                    : [new ActionRowBuilder().setComponents([forwardButton])]
            });

            if (canFitOnOnePage) return;

            const collector = embedMessage.createMessageComponentCollector({
            })

            let idx = 0;
            collector.on('collect', async interaction => {
                interaction.customId === backId ? (idx -= 10) : (idx += 10)
                await interaction.update({
                    embeds: [await generateEmbed(idx)],
                    components: [
                        new ActionRowBuilder().setComponents([
                            ...(idx ? [backButton] : []),
                            ...(idx + 10 < rankings.length ? [forwardButton] : [])
                        ])
                    ]
                })
            })


        } catch (error) {
            interaction.reply(`ERROR: ${error}`);
        }

    }
}