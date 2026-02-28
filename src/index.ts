// index file

import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { getMiniLeagueStandings } from "./services/standingsService.js";

dotenv.config();

console.log("testing");


const leagueId = "240333"
const testApi = `https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/`

async function testApiCall() {
    const playerStandings = await getMiniLeagueStandings(leagueId);
    for (const player of playerStandings) {
        console.log(player);
    }
}
//testApiCall();


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

// clientReady vs ready
client.once("clientReady", () => {
    console.log("Logged in");
    loadCommands();
})

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
})

client.login(process.env.DISCORD_TOKEN);

