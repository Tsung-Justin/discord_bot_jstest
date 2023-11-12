import { Events } from "discord.js"
import { useAppStore } from "../../store/app";

export const event = {
    name: Events.InteractionCreate,
    once: false
}

export const execute = async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const appStore = new useAppStore()
    const execute = appStore.commandsExectionMap.get(interaction.commandName)

    await execute(interaction)
}
