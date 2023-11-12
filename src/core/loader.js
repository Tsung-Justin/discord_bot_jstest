import { REST, Routes, Collection } from 'discord.js'
import fg from 'fast-glob'
import { useAppStore } from "@/store/app"

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
        const appStore = useAppStore()
        const executes = new Collection()
        const files = await fg('./src/commands/**/index.js')

        for (const file of files) {
            const cmd = await import(file)
            commands.push(cmd.command)
            executes.set(cmd.command.name, cmd.execute)
        }

        await updateSlashCommands(commands)
        appStore.commandsExectionMap = executes

    } catch (error) {
        console.log(error)
    }
}

export const loadEvents = async (client) => {
    const files = await fg('./src/events/**/index.js')
    try {
        for (const file of files) {
            const eventFile = await import(file)
            if (eventFile.event.once) {
                client.once(
                    eventFile.event.name,
                    eventFile.execute
                )
            } else {
                client.on(
                    eventFile.event.name,
                    eventFile.execute
                )
            }
        }
    } catch (error) {
        console.log(error)
    }
}
