
import { getInstalledAppCommand as command } from "./commands";
import { Promisify } from "@mcswift/node/child_process"

// windows 已安装应用信息数据类型
type InstalledAppRecord = {
  path: string;
  name: string;
  extension: string;
};

// 命令行返回的原始信息
type InstalledAppRaw = { "(default)": string; PSChildName: string };

// windows 已安装应用信息数据类型 Map
type InstalledAppMap = Map<string, InstalledAppRecord>;

// 已安装app map
export const installedAppMap = new Map<string, InstalledAppRecord>();

// 获取已安装 app
export const getInstalledApp = async (): Promise<InstalledAppMap> => {
  // 清除旧数据
  installedAppMap.clear();
  
  // powershell 获取数据
  const stdout = await Promisify.exec(command, {
    shell: "powershell",
  });
  
  // 解析出原始数据
  const raw = JSON.parse(stdout) as InstalledAppRaw[];
  // 遍历处理数据
  raw.forEach(infoHandle);
  return installedAppMap;
};

// 原始数据处理方法
const infoHandle = (item: InstalledAppRaw) => {
  // 分割名称
  const names = item.PSChildName.split(".");
  // 获取扩展名
  const extension = names.pop() as string;
  // 剩余名称重新连接
  const name = names.join(".");
  // 如果出现重名应用就抛出异常
  if (installedAppMap.has(name)) throw new Error(`同名应用:${name}`);
  // 将信息写入 map
  installedAppMap.set(name, {
    path: item["(default)"],
    name,
    extension,
  });
};
