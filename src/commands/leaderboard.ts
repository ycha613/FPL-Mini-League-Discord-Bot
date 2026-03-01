// src/commands/leaderboard.ts

import { ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField } from "discord.js";
import Command from "../base/classes/Command";
import CustomClient from "../base/classes/CustomClient";
import Category from "../base/enums/Category";
import { getMiniLeagueStandings } from "../services/leaderboardService";


export default class Leaderboard extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "leaderboard",
            description: "Displays the mini league leaderboard", 
            category: Category.Utilities,
            default_member_permissions: PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: true,
            cooldown: 3,
            options: []
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const leagueId = this.client.config.leagueId;

        try {
            const playerData = await getMiniLeagueStandings(leagueId);
            const top10 = playerData.slice(0, 10);
            const medals = ["🥇", "🥈", "🥉"];
            const rows = top10.map((player, index) => {
                const movement = player.playerLastRank - player.playerRank
                let arrow = "";
                if (movement > 0) arrow = "🔼";
                if (movement < 0) arrow = "🔽";

                const rankDisplay = index < 3 ? medals[index] : ` **${index + 1}.**`;

                return `${rankDisplay}  **${player.playerName}** (${player.playerTeamName}): ${player.playerPoints} points ${arrow}`;
            });

            const embed = new EmbedBuilder()
                .setTitle("🏆⚽    Mini League Leaderboard    ⚽🏆")
                .setColor("#77d32c") //green
                .setDescription("\n" + rows.join("\n\n"))
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        }   catch (ex) {
            console.error(ex);
            await interaction.editReply("Failed to fetch leaderboard.");
        }
    }
}