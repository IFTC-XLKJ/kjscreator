import { contextBridge, ipcRenderer } from "electron";
import Logger from "./logger.ts";
import path from "path";
import { fileURLToPath } from "url";

interface ChooseDirectoryOptions {
    title?: string;
}

contextBridge.exposeInMainWorld("iftc", {
    Logger: {
        info: (message: string) => Logger.info(message),
        warn: (message: string) => Logger.warn(message),
        error: (message: string) => Logger.error(message),
    },
    __dirname: path.resolve().replace(/\\/g, "/"),
    __filename: fileURLToPath(import.meta.url).replace(/\\/g, "/"),
    chooseDirectory: async (options: ChooseDirectoryOptions) => {
        Logger.info("start chooseDirectory");
        const result = await ipcRenderer.invoke("choose-directory", options);
        Logger.info("chooseDirectory done");
        Logger.info("chooseDirectory result: " + result);
        return result;
    },
});
