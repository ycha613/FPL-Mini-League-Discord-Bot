// src/commands/ids.ts

import { ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField } from "discord.js";
import Command from "../base/classes/Command";
import CustomClient from "../base/classes/CustomClient";
import Category from "../base/enums/Category";
import { getMiniLeaguePlayerDetails } from "../services/playerDetailsService";


export default class Leaderboard extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "ids",
            description: "Displays the player ids of all members of the mini league", 
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
            const playerData = await getMiniLeaguePlayerDetails(leagueId);
            const top10 = playerData.slice(0, 10); // only first 10
            const rows = top10.map((player, index) => {
                return `**${player.playerName}** (${player.playerTeamName}): **${player.playerId}**`;
            });

            const embed = new EmbedBuilder()
                .setTitle("Player Ids:")
                .setColor("#77d32c") //green
                .setDescription("\n" + rows.join("\n\n"))
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        }   catch (ex) {
            console.error(ex);
            await interaction.editReply("Failed to fetch player ids.");
        }
    }
}