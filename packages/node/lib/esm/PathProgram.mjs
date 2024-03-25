// packages/node/src/PathProgram.ts
import { existsSync, readdir } from "node:fs";
var typeRecord = {
  ps1: "powershell",
  cmd: "cmd",
  exe: "exe",
  bat: "cmd"
};
var canExec = ["ps1", "cmd", "exe", "bat"];
var pathProgramMap;
var getPathProgram = async () => {
  if (pathProgramMap)
    return pathProgramMap;
  pathProgramMap = /* @__PURE__ */ new Map();
  if (!process.env.Path) {
    return pathProgramMap;
  }
  const paths = [
    ...new Set(process.env.Path.split(";").filter((item) => !!item))
  ];
  const tasks = [];
  paths.forEach((path) => {
    if (!existsSync(path))
      return;
    const task = new Promise(readDirTaskInitFac(path));
    tasks.push(task);
  });
  await Promise.all(tasks);
  return pathProgramMap;
};
var readDirTaskInitFac = (path) => {
  const result = (resolve, reject) => {
    const thenHandle = (dirents) => {
      dirents.forEach((dirent) => createRecord(dirent, path));
      resolve();
    };
    readdir(path, { withFileTypes: true }, (err, files) => {
      if (err)
        return reject(err);
      files.forEach((dirent) => createRecord(dirent, path));
      resolve();
    });
  };
  return result;
};
var createRecord = (dirent, path) => {
  if (!pathProgramMap)
    return;
  if (dirent.isDirectory())
    return;
  const fileName = dirent.name;
  if (!fileNameCheck(fileName))
    return;
  const names = fileName.split(".");
  const extension = names.pop().toLowerCase();
  if (!canExec.includes(extension))
    return;
  const call = names.join(".");
  const record = {
    name: fileName,
    type: typeRecord[extension],
    call,
    path
  };
  if (!pathProgramMap.has(call)) {
    pathProgramMap.set(call, [record]);
    return;
  }
  pathProgramMap.get(call).push(record);
};
var fileNameCheck = (fileName) => !(!fileName.includes(".") || fileName.startsWith(".") || fileName.endsWith("."));
export {
  getPathProgram
};
