// playerTransfersService
import { getCurrentGameweek } from "./currentGameweekService";
import { getFootballPlayerData } from "./footballPlayerDetailsService";

export interface TransferData {
    elementInName: string;
    elementOutName: string;
    elementInTeam: string;
    elementOutTeam: string;
    elementInPosition: string;
    elementOutPosition: string;
    elementInCost: number;
    elementOutCost: number;
    gameweek: number
    time: string;
}


export async function getPlayerTransfers(id: string, gameweek: number = 0): Promise<TransferData[]> {
    const apiUrl = `https://fantasy.premierleague.com/api/entry/${id}/transfers/`;
    try {
        // call api and check response is ok
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        // extract player transfers data
        const data = await response.json();
        const mapped: any = data.map((t: any) => (
        {
            elementIn: t.element_in,
            elementOut: t.element_out,
            elementInCost: t.element_in_cost,
            elementOutCost: t.element_out_cost,
            gameweek: t.event,
            time: t.time
        }));


        let transfers: any[];
        // if gameweek not given return last 5 gameweeks
        if (gameweek === 0) { 
            const currGameweek = await getCurrentGameweek();

            transfers = mapped.filter((t: any) => {
                const lowerBound = Math.max(1, currGameweek - 4);
                return t.gameweek >= lowerBound;
            })

        } else {
            // else give transfers for given gameweek
            transfers = mapped.filter((t: any) => {
                return t.gameweek == gameweek;
            });
        }


        const transfersWithNames = await Promise.all(
            transfers.map(async (t: any) => {
                const inPlayerDetails = await getFootballPlayerData(t.elementIn);
                const outPlayerDetails = await getFootballPlayerData(t.elementOut);

                return {
                    elementInName: inPlayerDetails.name,
                    elementOutName: outPlayerDetails.name,
                    elementInTeam: inPlayerDetails.team,
                    elementOutTeam: outPlayerDetails.team,
                    elementInPosition: inPlayerDetails.position,
                    elementOutPosition: outPlayerDetails.position,
                    elementInCost: t.elementInCost,
                    elementOutCost: t.elementOutCost,
                    gameweek: t.gameweek,
                    time: t.time
                };
            })
        );

        // sort by gameweek
        transfersWithNames.sort((a: TransferData, b: TransferData) => b.gameweek - a.gameweek)

        return transfersWithNames;
        

    } catch (error) {
        console.error("Error fetching data from FPL API:", error);
        throw error;
    }
};