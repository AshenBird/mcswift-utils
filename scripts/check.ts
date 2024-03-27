import chalk from "chalk";
import { join } from "path";
import { Logger } from "../packages/base-utils/src";
import { NpmPackage } from "../packages/npm/src";
import { NPM } from "../packages/utils/src";
import { getPackageDir, root, workspace } from "./utils";
import { copyFileSync, existsSync } from "node:fs";

export const check = async (name: string) => {
  const dir = getPackageDir(name);
  const packInfo = new NpmPackage(dir);
  const version = workspace.data.version as string
  packInfo.setPackageInfo("version",version)
  // 
  const scripts = Object.assign(packInfo.data.scripts||{},{
    build : `cd ../../ && npm run build -- --pack="${name}"`,
    doctor : `cd ../../ && npm run doctor -- --pack="${name}"`
  })
  // 
  const repository = {
    "type": "git",
    "directory":`https://github.com/AshenBird/packages/tree/main/packages/${name}`
  }
  const author = {
    "email": "hi@mcswift.cn",
    "name": "McSwift"
  }
  packInfo.setPackageInfo("scripts",scripts)
  packInfo.setPackageInfo("repository",repository)
  packInfo.setPackageInfo("author",author)
  let result = true;
  // if (existsSync(join(dir, ".npmrc"))) {
  //   // copyFileSync(
  //   //   join(root, `.npmrc`),
  //   //   join(dir, ".npmrc")
  //   // );
  //   removeSync(join(dir, ".npmrc"))
  // }
  if (!existsSync(join(dir, ".eslintrc.js"))) {
    copyFileSync(
      join(root, `.eslintrc.js`),
      join(dir, ".eslintrc.js")
    );
  }
  for (const field of ["main", "module", "type", "files"] as const) {
    if (name === "types" && field === "main") continue;
    if (name === "types" && field === "module") continue;
    const r = existsPackageField(name, field, packInfo);
    if (!r) {
      result = r;
      continue;
    }
    const v = packInfo.data[field] as string;
    if (field === "files") continue;
    if (field === "type") {
      if (v !== "module") {
        Logger.error(
          `${chalk.white(`@mcswift/${name}`)} '${chalk.white(
            field
          )}' isn't module `
        );
        result = false;
      }
      continue;
    }
    const p = join(dir, v);
    if (existsSync(p)) continue;
    Logger.error(
      `${chalk.white(`@mcswift/${name}`)} can't find ${chalk.yellow(
        v
      )} for '${chalk.white(field)}'field `
    );
    result = false;
  }
  const { exports: exp } = packInfo.data;
  if (exp) {
    for (const rec of Object.values(exp)) {
      if (typeof rec === "string") {
        const p = join(dir, rec);
        if (existsSync(p)) continue;
        result = false;
        continue;
      }
      for (const v of Object.values(rec)) {
        const p = join(dir, v);
        if (existsSync(p)) continue;
        result = false;
        continue;
      }
    }
  }
  if (!result) return;
  Logger.log(`@mcswift/${name} check ${chalk.green("PASS")}!`);
};

const existsPackageField = (
  name: string,
  field: keyof NPM.Package,
  info: NpmPackage
) => {
  if (info.data[field]) return true;
  Logger.error(
    `@mcswift/${name} can't find '${field}' field `
  );
  return false;
};