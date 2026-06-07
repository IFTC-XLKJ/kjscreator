/**
 * iftc 库的全局类型定义
 */

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

// 导出一个空对象以确保该文件被视为模块（可选，但推荐用于某些 TS 配置）
export {};
