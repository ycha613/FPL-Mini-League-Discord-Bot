// src/base/interfaces/ICustomClient.ts

import IConfig from "./IConfig";


export default interface ICustomClient {
    config: IConfig;

    Init(): void;
    LoadHandlers(): void;
}