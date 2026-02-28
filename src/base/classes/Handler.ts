// src/base/classes/Handler.ts

import IHandler from "../interfaces/IHandler";
import path from "path";
import { glob } from "glob";
import { pathToFileURL } from "url";
import CustomClient from "./CustomClient";
import Event from "./Event";
import Command from "./Command";
import SubCommand from "./SubCommand";


export default class Handler implements IHandler {
    client: CustomClient;

    constructor(client: CustomClient) {
        this.client = client;
    }

    async LoadEvents() {
        const files = (await glob(`dist/events/**/*.js`)).map(filePath => path.resolve(filePath));
        //for (const file of files) {console.log(file)};

        files.map(async (file: string) => {
            const fileUrl = pathToFileURL(file).href; // convert to file://
            const imported = await import(fileUrl)
            const eventClass = imported.default?.default ?? imported.default; // handles normal esm and double wrapped
            const event: Event = new eventClass(this.client);

            if (!event.name) {
                return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop()} does not have name.`)
            }

            const execute = (...args: any) => event.Execute(...args);

            if (event.once) {
                //@ts-ignore
                this.client.once(event.name, execute);
            } else {
                //@ts-ignore
                this.client.on(event.name, execute);
            }

            return delete require.cache[require.resolve(file)]
        })
    }


    async LoadCommands() {
        const files = (await glob(`dist/commands/**/*.js`)).map(filePath => path.resolve(filePath));
        //for (const file of files) {console.log(file)};

        files.map(async (file: string) => {
            const fileUrl = pathToFileURL(file).href; // convert to file://
            const imported = await import(fileUrl)
            const commandClass = imported.default?.default ?? imported.default; // handles normal esm and double wrapped
            const command: Command | SubCommand = new commandClass(this.client);

            if (!command.name) {
                return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop()} does not have name.`)
            }

            if (file.split("/").pop()?.split(".")[2]) {
                return this.client.subcommands.set(command.name, command);
            }

            this.client.commands.set(command.name, command as Command);

            return delete require.cache[require.resolve(file)]
        })
    }
}