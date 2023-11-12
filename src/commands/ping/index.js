import { SlashCommandBuilder } from 'discord.js'

export const command = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping command')

export const execute = async (ctx) => {
    await ctx.reply(`pong!`)
}
