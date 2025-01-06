module.exports = async (client, guildId) => {
    let applicationCommands;

    if(guildId) {
        try {
            const guild = await client.guilds.fetch(guildId);
            applicationCommands = guild.commands;
        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    } else {
        try {
            applicationCommands = await client.application.commands;
        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    }

    try {
        await applicationCommands.fetch()
    } catch (error) {
        console.log(`ERROR: ${error}`);
    }

    return applicationCommands;

}