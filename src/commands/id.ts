// src/commands/id.ts

import { ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField } from "discord.js";
import Command from "../base/classes/Command";
import CustomClient from "../base/classes/CustomClient";
import Category from "../base/enums/Category";
import { getMiniLeaguePlayerDetails } from "../services/playerDetailsService";


export default class Id extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "id",
            description: "Gets the ids of players with a specific player name in the mini league.", 
            category: Category.Utilities,
            default_member_permissions: PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: true,
            cooldown: 3,
            options: [
                {
                    name: "name",
                    description: "name of the player (fpl account)",
                    type: 3, // string
                    required: true
                }
            ]
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const leagueId = this.client.config.leagueId;

        try {
            const name = interaction.options.getString("name", true);
            const playerData = await getMiniLeaguePlayerDetails(leagueId);
            //console.log(name.toLowerCase());

            const matchedPlayers = playerData.filter(player => {
                //console.log(player.playerName.toLowerCase());
                //console.log(player.playerName.toLowerCase() === name.toLowerCase());
                return player.playerName.toLowerCase() === name.toLowerCase();
            })

            //console.log(matchedPlayers);

            // case for no matches
            if (matchedPlayers.length === 0) {
                await interaction.editReply(`No players found matching "${name}".`);
                return
            }

            const rows = matchedPlayers.map((player, index) => {
                return `**${player.playerName}** (${player.playerTeamName}): **${player.playerId}**`;
            });

            const embed = new EmbedBuilder()
                .setTitle(`Player Ids for name "${name}":`)
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