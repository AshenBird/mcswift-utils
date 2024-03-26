import { readdirSync } from "node:fs";
import { NpmPackage } from "../packages/npm/src";
import { resolve } from "node:path";
import { Logger } from "../packages/base-utils/src";
export const workspace = new NpmPackage(resolve(__dirname, `../`));
export const root = resolve(__dirname, `../`)
export const getPackageDir =(name:string)=>resolve(__dirname, `../packages/${name}`)
export const bat = async (handle: (name: string) => any) => {
  const dirents = readdirSync(resolve(__dirname, "../packages"), {
    withFileTypes: true,
  });
  const tasks: any[] = [];
  for (const dirent of dirents) {
    if (dirent.isFile()) continue;
    const task = handle(dirent.name);
    if (task instanceof Promise) {
      tasks.push(task);
    }
  }
  if(tasks.length===0)return
  await Promise.all(tasks).catch((r) => {
    Logger.error(r);
  });
};