// packages/node/src/path.ts
import { readdirSync } from "fs-extra";
import { isAbsolute, join, resolve } from "node:path";
import { cwd } from "node:process";
var getAbsolutePath = (raw, base = cwd()) => {
  if (isAbsolute(raw)) {
    return raw;
  }
  return resolve(base, raw);
};
var getCommandFile = (command, root = "./") => {
  const p = getAbsolutePath(root);
  let filePath = "";
  const dir = join(p, "node_modules", ".bin");
  const dirents = readdirSync(dir, {
    withFileTypes: true
  });
  for (const dirent of dirents) {
    if (dirent.name !== command)
      continue;
    filePath = join(dir, dirent.name);
    break;
  }
  return filePath;
};
var getFilePaths = (path, exclude = []) => {
  const result = [];
  const nextExclude = [];
  for (const ex of exclude) {
    if (isAbsolute(ex)) {
      nextExclude.push(ex);
      continue;
    }
    nextExclude.push(getAbsolutePath(ex, path));
  }
  const dirents = readdirSync(path, { withFileTypes: true });
  for (const item of dirents) {
    const current = join(path, item.name);
    if (nextExclude.includes(current))
      continue;
    if (item.isFile()) {
      result.push(current);
      continue;
    }
    result.push(...getFilePaths(current, nextExclude));
  }
  return result;
};
var getDirectoryPaths = (path) => {
  const result = [];
  const dirents = readdirSync(path, { withFileTypes: true });
  for (const item of dirents) {
    const current = join(path, item.name);
    if (item.isFile())
      continue;
    result.push(current, ...getDirectoryPaths(current));
  }
  return result;
};
export {
  getAbsolutePath,
  getCommandFile,
  getDirectoryPaths,
  getFilePaths
};
