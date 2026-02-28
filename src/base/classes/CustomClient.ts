// src/base/classes/CustomClient.ts

import { Client, Collection }  from "discord.js";
import ICustomClient from "../interfaces/ICustomClient";
import IConfig from "../interfaces/IConfig";
import Handler from "./Handler";
import Command from "./Command";
import SubCommand from "./SubCommand";


export default class CustomClient extends Client implements ICustomClient {
    config: IConfig;
    handler: Handler;
    commands: Collection<string, Command>
    subcommands: Collection<string, SubCommand>
    cooldowns: Collection<string, Collection<string, number>>;

    constructor() {
        super({ intents: []});

        this.config = require(`${process.cwd()}/data/config.json`);
        this.handler = new Handler(this);
        this.commands = new Collection();
        this.subcommands = new Collection();
        this.cooldowns = new Collection();
    }

    Init(): void {
        this.LoadHandlers();

        this.login(this.config.token)
            .catch((error) => {
                console.error("Error logging in:", error);
            });
    }
 

    LoadHandlers(): void {
        this.handler.LoadEvents();
        this.handler.LoadCommands();
    }
}