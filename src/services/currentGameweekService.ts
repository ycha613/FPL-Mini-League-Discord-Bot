// currentGameweekService


export async function getCurrentGameweek(): Promise<number> {
    const apiUrl = `https://fantasy.premierleague.com/api/bootstrap-static/`;
    try {
        // call api and check response is ok
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        // extract gameweeks data
        const data = await response.json();
        const gameweeks = data.events;
        const currentGameweek = gameweeks.find((gameweek: any) => gameweek.is_current);

        return currentGameweek ? currentGameweek.id : 0; // return 0 if none current

        
    } catch (error) {
        console.error("Error fetching data from FPL API:", error);
        throw error;
    }
};