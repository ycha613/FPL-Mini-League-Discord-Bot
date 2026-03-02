// currentGameweekService

export interface FootballPlayerData {
    name: string; //web_name
    team: string;
    position: string;

}

export async function getFootballPlayerData(playerId: number): Promise<number> {
    const apiUrl = `https://fantasy.premierleague.com/api/bootstrap-static/`;
    try {
        // call api and check response is ok
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        // extract gameweeks data
        const data = await response.json();
        const players = data.elements;
        const player = players.find((player: any) => player.id == playerId);
        return 1;
        

        
    } catch (error) {
        console.error("Error fetching data from FPL API:", error);
        throw error;
    }
};