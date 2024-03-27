import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { Logger } from "@mcswift/base-utils";
import { NpmPackage } from "@mcswift/npm"
export const workspace = new NpmPackage(resolve(__dirname, `../`));
export const root = resolve(__dirname, `../`)
export const getPackageDir =(name:string)=>resolve(__dirname, `../packages/${name}`)
export const bat = async (handle: (name: string) => any):Promise<any[]> => {
  const dirents = readdirSync(resolve(__dirname, "../packages"), {
    withFileTypes: true,
  });
  const results:any[] = []
  for (const dirent of dirents) {
    if (dirent.isFile()) continue;
    const r = await handle(dirent.name).catch((r:any) => {
      Logger.error(`Bat Error: ${dirent.name}`);
      return undefined
    })
    results.push(r)
  }
  return results
};