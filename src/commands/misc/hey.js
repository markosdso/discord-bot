module.exports = {
    name: 'hey',
    description: 'Replies with hey.',
    
    callback: (client, interaction) => {
        interaction.reply('hey!');
    }
}