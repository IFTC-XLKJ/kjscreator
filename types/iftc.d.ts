/**
 * iftc 库的全局类型定义
 */

// 定义 File 实例的接口
interface IftcFileInstance {
    /**
     * 文件路径
     */
    path: string;

    /**
     * 读取文件内容为 Buffer
     */
    read(): Promise<Buffer>;

    /**
     * 读取文件内容为文本字符串
     */
    readText(): Promise<string>;

    /**
     * 检查文件是否存在
     */
    exists(): Promise<boolean>;
}

// 定义 ChooseDirectoryOptions 接口
interface ChooseDirectoryOptions {
    title?: string;
}

// 使用 declare global 来扩展全局作用域
declare global {
    /**
     * iftc 全局对象
     */
    const iftc: {
        /**
         * 日志记录器实例
         */
        Logger: Logger;

        /**
         * 当前应用的目录路径
         */
        __dirname: string;

        /**
         * 当前文件的完整路径
         */
        __filename: string;

        /**
         * 选择目录
         * @param options - 可选配置项
         * @returns 选中的目录路径
         */
        chooseDirectory(options?: ChooseDirectoryOptions): Promise<string | string[] | null>;

        /**
         * 用户主目录路径
         */
        homeDir: string;

        /**
         * 文件操作对象构造函数
         * @param filepath - 文件路径，默认为主目录
         * @returns 文件操作实例
         */
        File(filepath?: string): IftcFileInstance;
    };
}

/**
 * 日志记录器接口
 */
interface Logger {
    /**
     * 记录信息级别日志
     * @param message - 日志消息
     */
    info(message: string): void;

    /**
     * 记录警告级别日志
     * @param message - 日志消息
     */
    warn(message: string): void;

    /**
     * 记录错误级别日志
     * @param message - 日志消息
     */
    error(message: string): void;
}

// 导出一个空对象以确保该文件被视为模块
export {};
