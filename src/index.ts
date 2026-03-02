// index file

import CustomClient from "./base/classes/CustomClient";
import { getPlayerTransfers } from "./services/playerTransfersService";



console.log("testing");


const leagueId = "240333"

async function testServiceCall() {
    const transfers = await getPlayerTransfers("1381258", 21)
    console.log(transfers)
}
testServiceCall();


(new CustomClient).Init();


