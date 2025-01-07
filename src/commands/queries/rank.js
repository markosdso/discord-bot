const { ApplicationCommandOptionType, ButtonStyle } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
const Ranking = require('../../models/ranking');
const User = require('../../models/user');

module.exports = {
    name: 'rank',
    description: 'display top 5 coasters of calling user',
    options: [
        {
            name: 'id',
            description: 'user id',
            type: ApplicationCommandOptionType.User,
            required: 'true'
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

            const rankings = await Ranking.findAll({ 
                where: {id: id},
                order: [
                    ['rank', 'ASC']
                ]
            });


            const generateEmbed = start => {
                const cur = rankings.slice(start, start + 10)

                curPage = Math.floor((start / 10) + 1);
                pageTotal = Math.ceil((rankings.length / 10))

                let output = '';
                for(ranking of cur){
                    output += `${ranking.rank}. ${ranking.name}, ${ranking.park} \n`;
                }

                return new EmbedBuilder()
                    .setTitle(`${user.name}'s (@${user.tag}) ranking\n 📄  (${curPage}/${pageTotal})`)
                    .setDescription(output)
                    .setColor('DarkOrange')

            }

            const canFitOnOnePage = rankings.length <= 10
            const embedMessage = await interaction.reply({
                embeds: [generateEmbed(0)],
                components: canFitOnOnePage
                    ? []
                    : [new ActionRowBuilder().setComponents([forwardButton])]
            });

            if (canFitOnOnePage) return;

            const collector = embedMessage.createMessageComponentCollector({
                filter: ({member}) => member.id === user.id
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