import { REST, Routes } from 'discord.js'
import fg from 'fast-glob'

const updateSlashCommands = async (commands) => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`)

        const rest = new REST({ version: 10 }).setToken(process.env.TOKEN)
        const result = await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            {
                body: commands,
            }
        )

        console.log(`Successfully reload ${result.length} application (/) commands.`)
    } catch (error) {
        console.log(error)
    }
}

export const loadCommands = async () => {
    try {
        const commands = []
        const files = await fg('./src/commands/**/index.js')
        for (const file of files) {
            const cmd = await import(file)
            commands.push(cmd.command)
        }
    
        await updateSlashCommands(commands)
    } catch (error) {
        console.log(error)
    }
}
