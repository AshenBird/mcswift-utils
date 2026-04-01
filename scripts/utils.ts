import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { Logger } from "@mcswift/base-utils";
import { NpmPackage } from "@mcswift/npm";
import console from "node:console";
const __dirname = import.meta.dirname;
export const workspace = new NpmPackage(resolve(__dirname, `../`));
export const root = resolve(__dirname, `../`);
export const getPackageDir = (name: string) =>
  resolve(__dirname, `../packages/${name}`);
export const bat = async (
  handle: (name: string) => any,
  sync: boolean = false,
): Promise<any[]> => {
  const dirents = readdirSync(resolve(__dirname, "../packages"), {
    withFileTypes: true,
  });
  const results: any[] = [];
  const tasks: Promise<any>[] = [];
  for (const dirent of dirents) {
    if (dirent.isFile()) continue;
    if (sync) {
      const r = await handle(dirent.name).catch((r: any) => {
        Logger.error(`Bat Error: ${dirent.name}`);
        console.error(r);
        return undefined;
      });
      results.push(r);
    } else {
      tasks.push(
        handle(dirent.name).catch((r: any) => {
          Logger.error(`Bat Error: ${dirent.name}`);
          console.error(r);
          return undefined;
        }),
      );
    }
  }
  if (sync) return results;
  const taskResults = await Promise.allSettled(tasks);
  for (const result of taskResults) {
    if (result.status !== "fulfilled") {
      Logger.error(`Bat Error: ${result.reason.name}`);
      continue;
    }
    results.push(result.value);
  }
  return results;
};
