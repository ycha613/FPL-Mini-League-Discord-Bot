// src/commands/leaderboard.ts

import { SlashCommandBuilder, ChatInputCommandInteraction} from "discord.js";
//import { getMiniLeagueStandings, PlayerData } from "../services/standingsService";

export default {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Displays the current leaderboard for the mini-league."),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();  // incase fetching takes time

        try {
            const leagueId = "240333"; // TODO: make this dynamic
            //const standings: PlayerData[] = await getMiniLeagueStandings(leagueId);
            //const leaderboardString = standings.map(player => `${player.playerRank}. ${player.playerName} - ${player.playerPoints} pts`).join("\n");
            //await interaction.editReply(`Current Mini-League Standings:\n\n${leaderboardString}`);
        } catch (error) {
            await interaction.editReply("Error fetching leaderboard data.");
        };
    }
};