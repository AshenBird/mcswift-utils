import { readdirSync } from "node:fs";
import { NpmPackage } from "../packages/npm/src";
import { resolve } from "node:path";
import { Logger } from "@mcswift/base-utils";
export const workspace = new NpmPackage(resolve(__dirname, `../`));
export const root = resolve(__dirname, `../`)
export const getPackageDir =(name:string)=>resolve(__dirname, `../packages/${name}`)
export const bat = async (handle: (name: string) => any):Promise<any[]> => {
  const dirents = readdirSync(resolve(__dirname, "../packages"), {
    withFileTypes: true,
  });
  // const tasks: any[] = [];
  const results:any[] = []
  for (const dirent of dirents) {
    if (dirent.isFile()) continue;
    const r = await handle(dirent.name).catch((r:any) => {
      Logger.error(`Bat Error: ${dirent.name}`);
      console.error(r)
      return undefined
    })
    results.push(r)
    // const task = handle(dirent.name);
    // if (task instanceof Promise) {
    //   tasks.push(task);
    // }
  }
  return results
  // if(tasks.length===0)return []
  // return await Promise.all(tasks).catch((r) => {
  //   Logger.error(r);
  //   return []
  // });
};