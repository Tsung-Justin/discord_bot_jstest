import { Client, GatewayIntentBits } from 'discord.js'
import { loadCommands, loadEvents } from "@/core/loader"
import dotenv from 'dotenv'
import vueInit from '@/core/vue'
import { useAppStore } from '@/store/app'

vueInit()
dotenv.config()
loadCommands()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const appStore = new useAppStore()
appStore.Client = client

loadEvents(client)

client.login(process.env.TOKEN)
