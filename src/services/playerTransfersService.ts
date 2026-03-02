// playerTransfersService
import { getCurrentGameweek } from "./currentGameweekService";

export interface TransferData {
    elementIn: number;
    elementOut: number;
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

        const mapped: TransferData[] = data.map((t: any) => ({
            elementIn: t.element_in,
            elementOut: t.element_out,
            elementInCost: t.element_in_cost,
            elementOutCost: t.element_out_cost,
            gameweek: t.event,
            time: t.time
        }));

        // sort by gameweek
        mapped.sort((a: TransferData, b: TransferData) => b.gameweek - a.gameweek)


        // if gameweek not given return last 5 gameweeks
        if (gameweek === 0) { 
            const currGameweek = await getCurrentGameweek();
            //console.log(currGameweek);
            const last5: TransferData[] = mapped.filter((t: TransferData) => {
                const lowerBound = Math.max(1, currGameweek - 4);
                return t.gameweek >= lowerBound;
            })
            return last5;
        }

        // else give transfers for given gameweek
        const transfers = mapped.filter((t: TransferData) => {
            return t.gameweek == gameweek;
        });

        return transfers
        

    } catch (error) {
        console.error("Error fetching data from FPL API:", error);
        throw error;
    }
};