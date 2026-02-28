// index file

import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { getMiniLeagueStandings } from "./services/standingsService";


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
testApiCall();





const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.once("clientReady", () => {
    console.log("Logged in");
})

client.on("messageCreate", async (message) => {
    // ignore messages from other bots
    if (message.author.bot) return;
})

client.login(process.env.DISCORD_TOKEN);

