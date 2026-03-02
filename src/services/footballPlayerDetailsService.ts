// currentGameweekService

export interface FootballPlayerData {
    name: string; //web_name
    team: string;
    position: string;

}

export async function getFootballPlayerData(playerId: number): Promise<FootballPlayerData> {
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
        //console.log(player.web_name)

        // get team
        const teamId = player.team_code;
        const teams = data.teams;
        const team = teams.find((t: any) => t.code === teamId)
        //console.log(team.short_name)

        // get position
        const positionId = player.element_type;
        const positions = data.element_types;
        //console.log(positions[0])
        const position = positions.find((p: any) => p.id === positionId)
        //console.log(position)

        const cleanedPlayer: FootballPlayerData = {
            name: player.web_name,
            team: team.short_name,
            position: position.singular_name_short
        }

        return cleanedPlayer;
        

        
    } catch (error) {
        console.error("Error fetching data from FPL API:", error);
        throw error;
    }
};