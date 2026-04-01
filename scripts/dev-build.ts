import { Logger } from "@mcswift/base-utils";
import { join } from "path";
import { build as _build } from "esbuild";
import { getPackageDir } from "./utils";
import { existsSync, writeFileSync } from "node:fs";
import { emptyDirSync, ensureDirSync, ensureFileSync } from "fs-extra";
import { NpmPackage } from "@mcswift/npm";
export const devBuild = async (name: string) => {
  const packDirPath = getPackageDir(name);
  if (!existsSync(packDirPath)) {
    throw new Error(`can't found ${name} package`);
  }
  Logger.log(`@mcswift/${name} DEV BUILD BEGIN`);
  //   const src = join(packDirPath, "src");
  const out = join(packDirPath, "lib");
  const cjs = join(out, "cjs");
  const esm = join(out, "esm");
  ensureDirSync(out);
  emptyDirSync(out);
  ensureDirSync(esm);
  ensureDirSync(cjs);
  const packInfoInst = new NpmPackage(packDirPath);
  const info = packInfoInst.getPackageInfo();
  const exps = info.exports;
  if (!exps) {
    throw new Error(`can't found exports in ${name} package`);
  }
  const newExps = {} as Record<string, any>;
  const entries: {
    path: string;
    content: string;
  }[] = [];
  for (const key of Object.keys(exps)) {
    const fileName = key === "." ? "index" : key.replace("./", "");
    newExps[key] = {
      import: `./lib/esm/${fileName}.mjs`,
      require: `./lib/cjs/${fileName}.cjs`,
      types: `./src/${fileName}.ts`,
    };
    entries.push({
      path: join(esm, `${fileName}.mjs`),
      content: `export * from '../../src/${fileName}.ts'`,
    });
  }
  for (const entry of entries) {
    ensureFileSync(entry.path);
    writeFileSync(entry.path, entry.content);
  }
  packInfoInst.setPackageInfo("exports", newExps);

  Logger.log(`@mcswift/${name} DEV BUILD FINISH`);
};
