// playerDetailsService

export interface PlayerData {
  playerName: string;
  playerId: number;
  playerRank: number;
  playerRankSort: number;
  playerLastRank: number;
  playerPoints: number;
  playerTeamName: string;
}


export async function getMiniLeaguePlayerDetails(leagueId: string): Promise<PlayerData[]> {
    const apiUrl = `https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/`;
    try {
        // call api and check response is ok
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        // extract player standings data
        const data = await response.json();
        //console.log(JSON.stringify(data.standings.results, null, 2));
        const standings = data.standings.results;
        const mapped: PlayerData[] = standings.map((player: any) => ({
            playerName: player.player_name,
            playerId: player.id,
            playerRank: player.rank,
            playerRankSort: player.rank_sort,
            playerLastRank: player.last_rank,
            playerPoints: player.total,
            playerTeamName: player.entry_name,
        }));

        // sort players by rank_sort and return
        mapped.sort((a, b) => a.playerRankSort - b.playerRankSort);
        return mapped;


    } catch (error) {
        console.error("Error fetching data from FPL API:", error);
        throw error;
    }
};