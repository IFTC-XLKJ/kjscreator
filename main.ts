import { app, BrowserWindow, ipcMain, dialog } from "electron";
import Logger from "./logger.ts";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url);

Logger.new();
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 960,
        height: 540,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: `${__dirname}/preload.ts`,
        },
        resizable: false,
    });
    mainWindow.removeMenu();
    mainWindow.webContents.openDevTools();
    mainWindow.loadFile("index.html");
    ipcMain.handle("choose-directory", async (event, options) => {
        const result = await dialog.showOpenDialog({
            properties: ["openDirectory"],
            title: options.title || "请选择目录",
        });
        return result.filePaths[0];
    });
    return mainWindow;
}

function createEditorWindow() {
    const editorWindow = new BrowserWindow({
        width: 960,
        height: 540,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: `${__dirname}/preload.ts`,
        },
        resizable: false,
    });
    editorWindow.removeMenu();
    editorWindow.webContents.openDevTools();
    editorWindow.loadFile("editor.html");
}

let mainWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
    Logger.info("app ready");
    mainWindow = createMainWindow();
    Logger.info("mainWindow created");
});

app.on("window-all-closed", () => {
    app.quit();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow = createMainWindow();
    }
});
