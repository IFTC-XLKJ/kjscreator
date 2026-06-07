import { contextBridge } from "electron";
import Logger from "./logger.ts";
import path from "path";

contextBridge.exposeInMainWorld("iftc", {
    Logger: {
        info: (message: string) => Logger.info(message),
        warn: (message: string) => Logger.warn(message),
        error: (message: string) => Logger.error(message),
    },
    __dirname: path.resolve().replace(/\\/g, "/"),
});
