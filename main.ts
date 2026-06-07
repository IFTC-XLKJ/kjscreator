import { app, BrowserWindow, ipcMain, dialog } from "electron";
import Logger from "./logger.ts";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url);

interface Project {
    name: string;
    path: string;
    uuid: string;
}

Logger.new();
if (
    !fs
        .stat("projects.json")
        .then(() => true)
        .catch(() => false)
) {
    Logger.info("projects.json not found, creating a new one");
    await fs.writeFile("projects.json", JSON.stringify([], null, 2));
}
const editorWindows: Record<string, BrowserWindow> = {};
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
    ipcMain.handle("new-editor-window", (event, project: Project) => {
        const editorWindow = createEditorWindow(project);
        editorWindows[String(editorWindow.id)] = editorWindow;
        return editorWindow.id;
    });
    return mainWindow;
}

function createEditorWindow(project: Project) {
    const editorWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: `${__dirname}/preload.ts`,
        },
    });
    editorWindow.removeMenu();
    editorWindow.webContents.openDevTools();
    const filePath = path.join(__dirname, "editor.html");
    const fileUrl = new URL(`file://${filePath.replace(/\\/g, "/")}`);
    fileUrl.searchParams.append("uuid", project.uuid);
    fileUrl.searchParams.append("name", project.name);
    fileUrl.searchParams.append("path", project.path);
    editorWindow.loadURL(fileUrl.toString());
    return editorWindow;
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
