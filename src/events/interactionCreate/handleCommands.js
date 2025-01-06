const { devs, testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
    if(!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);

        if (!commandObject) return;
        
        if(commandObject.devOnly) {
            if(!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: 'Only developers are allowed to run this command.',
                    ephemeral: true
                 });
                 return;
            }
        }

        if(commandObject.testOnly) {
            if(testServer) {
                if(!(interaction.guild.id == testServer)) {
                    interaction.reply({
                        content: 'This command cannot be run here.',
                        ephemeral: true
                     });
                     return;
                }
            }
        }

        await commandObject.callback(client, interaction);

    } catch (error) {
        console.log(`ERROR: ${error}`);
    }
};