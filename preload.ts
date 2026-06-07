import { contextBridge, ipcRenderer } from "electron";
import Logger from "./logger.ts";
import path from "path";
import { fileURLToPath } from "url";
// 修复点：删除错误的 import { fs } from "fs/promises";
import { readFile, writeFile, stat } from "fs/promises";
// import * as fs from "fs";
import os from "os";

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
    homeDir: os.homedir().replace(/\\/g, "/"),
    File: function (filepath: string) {
        filepath = filepath || os.homedir();
        filepath = path.resolve(filepath);
        filepath = filepath.replace(/\\/g, "/");
        Logger.info("File path: " + filepath);
        const obj = {
            path: filepath,
            read: async () => {
                Logger.info("start readFile");
                const result = await readFile(obj.path);
                Logger.info("readFile done");
                Logger.info("readFile result: " + result.byteLength + " bytes");
                return result;
            },
            readText: async () => {
                Logger.info("start readFile");
                const result = await readFile(obj.path);
                Logger.info("readFile done");
                Logger.info("readFile result: " + result.byteLength + " bytes");
                return await new Blob([result]).text();
            },
            exists: async () => {
                Logger.info("start checkFileExists");
                let result: boolean;
                try {
                    await stat(obj.path);
                    result = true;
                } catch (e) {
                    Logger.info("stat error: " + e);
                    result = false;
                }
                Logger.info("checkFileExists done");
                Logger.info("checkFileExists result: " + result);
                return result;
            },
        };
        return obj;
    },
});
