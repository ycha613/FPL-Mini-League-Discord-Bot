// index file

import { Client, GatewayIntentBits } from "discord.js";
import CustomClient from "./base/classes/CustomClient";
import { getMiniLeagueStandings } from "./services/standingsService.js";


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


(new CustomClient).Init();


