// src/base/interfaces/IEventOptions.ts

import { Events } from "discord.js";


export default interface IEventOptions {
    name: Events;
    description: string;
    once: boolean;
}