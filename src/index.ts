// index file

import CustomClient from "./base/classes/CustomClient";
import { getPlayerTransfers } from "./services/playerTransfersService";
import { getFootballPlayerData } from "./services/footballPlayerDetailsService";


const leagueId = "240333"

async function testServiceCall() {
    const transfers = await getPlayerTransfers("1381258", 21)
    console.log(transfers)
}

async function testPlayerServiceCall() {
    const id = 661; // eikitike?
    const player = await getFootballPlayerData(id);
    console.log(player);
}
//testServiceCall();
//testPlayerServiceCall();


(new CustomClient).Init();


