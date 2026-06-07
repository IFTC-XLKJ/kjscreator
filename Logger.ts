import fs from "fs/promises";

class Logger {
    private constructor() {}
    public static new() {
        fs.appendFile("app.log", "---------- KubeJS Creator Log ----------\n");
    }
    public static info(message: string): void {
        console.info(`[INFO ${new Date().toISOString()}] ${message}`);
        fs.appendFile("app.log", `[INFO ${new Date().toISOString()}] ${message}\n`);
    }
    public static error(message: string): void {
        console.error(`[ERROR ${new Date().toISOString()}] ${message}`);
        fs.appendFile("app.log", `[ERROR ${new Date().toISOString()}] ${message}\n`);
    }
    public static warn(message: string): void {
        console.warn(`[WARN ${new Date().toISOString()}] ${message}`);
        fs.appendFile("app.log", `[WARN ${new Date().toISOString()}] ${message}\n`);
    }
    public static clear(): void {
        fs.writeFile("app.log", "");
    }
}
export default Logger;
