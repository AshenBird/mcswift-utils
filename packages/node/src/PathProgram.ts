
import { Dirent, existsSync, readdir } from "node:fs";
const typeRecord = {
  ps1: "powershell",
  cmd: "cmd",
  exe: "exe",
  bat: "cmd",
};

type PathProgramInfo = {
  name: string;
  type: string;
  call: string;
  path: string;
};

const canExec = ["ps1", "cmd", "exe", "bat"];

let pathProgramMap: Map<string, PathProgramInfo[]>;

export const getPathProgram = async (): Promise<Map<string, PathProgramInfo[]>> => {
  // 判断缓存
  if (pathProgramMap) return pathProgramMap;
  // 初始化结果
  pathProgramMap = new Map<string, PathProgramInfo[]>();
  // 判断环境变量是否存在
  if (!process.env.Path) {
    return pathProgramMap;
  }
  // 规范化 path 数组
  const paths = [
    ...new Set(process.env.Path.split(";").filter((item) => !!item)),
  ];
  // 初始化目录读取任务队列
  const tasks: Promise<void>[] = [];

  // 遍历 path
  paths.forEach((path) => {
    // 跳过不存在的路径
    if (!existsSync(path)) return;

    // 新建任务
    const task = new Promise<void>(readDirTaskInitFac(path));
    // 推入任务队列
    tasks.push(task);
  });
  // 等待任务队列完成,并获取结果
  await Promise.all(tasks);
  return pathProgramMap;
};

const readDirTaskInitFac = (path: string) => {
  const result = (resolve: () => void, reject: (reason?: any) => void) => {
    const thenHandle = (dirents: Dirent[]) => {
      dirents.forEach((dirent) => createRecord(dirent, path));
      resolve();
    };
    readdir(path, { withFileTypes: true }, (err, files) => {
      if (err) return reject(err);
      files.forEach((dirent) => createRecord(dirent, path));
      resolve();
    });
  };
  return result;
};

const createRecord = (dirent: Dirent, path: string) => {
  if (!pathProgramMap) return;
  if (dirent.isDirectory()) return;

  const fileName = dirent.name;
  // 没有扩展名的文件,跳过
  if (!fileNameCheck(fileName)) return;

  // 切分文件名
  const names = fileName.split(".");
  const extension = (
    names.pop() as string
  ).toLowerCase() as keyof typeof typeRecord;

  // 不支持的扩展名,跳过
  if (!canExec.includes(extension)) return;
  const call = names.join(".");
  const record = {
    name: fileName,
    type: typeRecord[extension],
    call,
    path,
  };
  // 记录
  if (!pathProgramMap.has(call)) {
    pathProgramMap.set(call, [record]);
    return;
  }

  (pathProgramMap.get(call) as PathProgramInfo[]).push(record);
};

const fileNameCheck = (fileName: string) =>
  !(
    !fileName.includes(".") ||
    fileName.startsWith(".") ||
    fileName.endsWith(".")
  );
