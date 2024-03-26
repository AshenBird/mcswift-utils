export declare const getAbsolutePath: (raw: string, base?: string) => string;
/**
 * 向上查找 npm 安装的命令
 * @param command
 * @param root
 * @returns
 */
export declare const getCommandFile: (command: string, root?: string) => string | undefined;
/**
 * 递归获取路径下所有的文件路径
 * @param path
 * @param result
 * @returns
 */
export declare const getFilePaths: (path: string, exclude?: string[]) => string[];
/**
 * 递归获取路径下所有的目录路径
 * @param path
 * @param result
 * @returns
 */
export declare const getDirectoryPaths: (path: string) => string[];
