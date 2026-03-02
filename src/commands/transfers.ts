// src/commands/transfers.ts

import { ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField } from "discord.js";
import Command from "../base/classes/Command";
import CustomClient from "../base/classes/CustomClient";
import Category from "../base/enums/Category";
import { getPlayerTransfers } from "../services/playerTransfersService";


export default class Transfers extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "transfers",
            description: "Gets the transfers for a player in a specific gameweek", 
            category: Category.Utilities,
            default_member_permissions: PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: true,
            cooldown: 3,
            options: [
                {
                    name: "id",
                    description: "id of the player, if not known can use /id playerName first or /ids to find",
                    type: 3, // string
                    required: true
                },
                {
                    name: "gameweek",
                    description: "gameweek number",
                    type: 4, // integer
                    required: false
                }
            ]
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        try {
            const id = interaction.options.getString("id", true);
            const gameweekInput = interaction.options.getInteger("gameweek");
            let gameweek = 0;
            if (gameweekInput !== null) {
                gameweek = gameweekInput;
            }

            const transfers = await getPlayerTransfers(id, gameweek);

            // if no gameweek given and no transfers in last 5 gameweeks
            if (gameweek === 0 && transfers.length === 0) {
                await interaction.editReply(`No transfers in the last 5 gameweeks. To check a specific gameweek please use the optional gameweek parameter in the command`);
                return
            }

            // if gameweek given but no transfers
            if (transfers.length === 0) {
                await interaction.editReply(`No transfers made in gameweek ${gameweek}.`);
            }

            const embed = new EmbedBuilder().setColor("#77d32c").setTimestamp()
        
            // no gameweek given and transfers made in last 5 gameweeks
            if (gameweek === 0) {embed.setTitle(`Player transfers for ${id} in last 5 gameweeks:`)};

            // gameweek given and transfers made
            if (gameweek !== 0) {embed.setTitle(`Player transfers for ${id} in gameweek ${gameweek}:`)};

            // add actual transfers to description
            const rows = transfers.map((transfer, index) => {
                const outCost = transfer.elementOutCost / 10;
                const inCost = transfer.elementInCost / 10;
                return `**Gameweek ${transfer.gameweek}**\nOut: ${transfer.elementOut} (${outCost}m)\nIn: ${transfer.elementIn} (${inCost}m)`;
            });

            embed.setDescription(rows.join("\n\n"))

            await interaction.editReply({ embeds: [embed] });

        }   catch (ex) {
            console.error(ex);
            await interaction.editReply("Failed to fetch player ids.");
        }
    }
}