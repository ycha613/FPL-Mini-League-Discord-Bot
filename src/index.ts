// index file

import { Client, GatewayIntentBits } from "discord.js";
import CustomClient from "./base/classes/CustomClient";



console.log("testing");


const leagueId = "240333"
const testApi = `https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/`

async function testApiCall() {
    return;
}
//testApiCall();


(new CustomClient).Init();


