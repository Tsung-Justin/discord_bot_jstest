import { Client, Events, GatewayIntentBits } from 'discord.js'
import { loadCommands } from "@/core/loader";
import dotenv from 'dotenv'

dotenv.config()
loadCommands()

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN);
