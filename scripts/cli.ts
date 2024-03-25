import * as Path from "node:path";
import * as FS from "fs";
import { Logger } from "../packages/base-utils/src";
import { build as _build } from "esbuild";
import * as FileSystem from "fs-extra";
import { mandatoryFileExtensionsPlugin } from "../packages/esbuild/src";
import { generatorDeclare } from "../packages/tsc/src";
import { Cli } from "../packages/cli/src";
import { copyFileSync, existsSync, readdirSync } from "node:fs";
import { getFilePaths } from "../packages/node/src";
import { NpmPackage } from "../packages/npm/src";
import { NPM } from "../packages/utils/src";
import chalk from "chalk";
import { execSync } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
const cli = new Cli();
// const rl = createInterface({
//   input,
//   output,
// });
cli.use("build", (options) => {
  const { pack } = options;
  if (pack === "types") return;
  if (pack) return buildPackage(pack as string);
  bat(buildPackage);
});
cli.use("doctor", (options) => {
  const { pack } = options;
  if (pack) return checkPackage(pack as string);
  bat(checkPackage);
});

cli.use("publish", async () => {
  // await bat(buildPackage);
  // await bat(checkPackage);
  bat(publish);
});

const buildPackage = async (name: string) => {
  if (name === "types") return;
  Logger.log(`${name} BUILD BEGIN`);
  const root = Path.resolve(__dirname, `../packages/${name}`);
  if (!existsSync(root)) {
    throw new Error(`can't found ${name} package`);
  }
  const out = Path.join(root, "lib");
  const src = Path.join(root, "src");
  const cjs = Path.join(out, "cjs");
  const esm = Path.join(out, "esm");
  const types = Path.join(root, "types");
  const fileList = getFilePaths(src).filter((val) => !val.endsWith("md"));
  FileSystem.ensureDirSync(out);
  FileSystem.emptyDirSync(out);
  FileSystem.ensureDirSync(esm);
  FileSystem.ensureDirSync(cjs);
  FileSystem.ensureDirSync(types);
  FileSystem.emptyDirSync(types);
  const tasks: Promise<unknown>[] = [];
  tasks.push(
    _build({
      entryPoints: fileList,
      drop: ["debugger"],
      platform: "node",
      target: ["node20"],
      bundle: true,
      outdir: cjs,
      format: "cjs",
      packages: "external",
      plugins: [
        mandatoryFileExtensionsPlugin({
          cjsExtension: "cjs",
          esm: false,
        }),
      ],
    })
  );
  tasks.push(
    _build({
      entryPoints: fileList,
      platform: "node",
      drop: ["debugger"],
      target: ["node20"],
      bundle: true,
      packages: "external",
      plugins: [
        mandatoryFileExtensionsPlugin({
          esm: true,
          esmExtension: "mjs",
        }),
      ],
      outdir: esm,
      format: "esm",
    })
  );
  // 生成类型
  await generatorDeclare("./src", "./types", root, "tsconfig.json");
  const buildInfoPath = Path.join(root, "tsconfig.tsbuildinfo");
  if (FS.existsSync(buildInfoPath)) {
    tasks.push(FS.promises.rm(buildInfoPath));
  }
  await Promise.all(tasks);
  Logger.log(`${name} BUILD FINISH`);
};
const workspace = new NpmPackage(Path.resolve(__dirname, `../`))
const checkPackage = (name: string) => {
  const dir = Path.resolve(__dirname, `../packages/${name}`);
  const packInfo = new NpmPackage(dir);
  
  const version = workspace.data.version as string
  packInfo.setPackageInfo("version",version)
  let result = true;
  if (!existsSync(Path.join(dir, ".npmrc"))) {
    copyFileSync(
      Path.resolve(__dirname, `../.npmrc`),
      Path.join(dir, ".npmrc")
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
    const p = Path.join(dir, v);
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
        const p = Path.join(dir, rec);
        if (existsSync(p)) continue;
        result = false;
        continue;
      }
      for (const v of Object.values(rec)) {
        const p = Path.join(dir, v);
        if (existsSync(p)) continue;
        result = false;
        continue;
      }
    }
  }
  if (!result) return;
  Logger.log(`@mcswift/${name} check ${chalk.green("pass")}!`);
};

const existsPackageField = (
  name: string,
  field: keyof NPM.Package,
  info: NpmPackage
) => {
  if (info.data[field]) return true;
  Logger.error(
    `${chalk.white(`@mcswift/${name}`)} can't find '${chalk.white(
      field
    )}' field `
  );
  return false;
};
const publish = (name: string) => {
  const dir = Path.resolve(__dirname, `../packages/${name}`);
  Logger.debug(dir);
  execSync(`cd ${dir} && npm unpublish --force`, { encoding: "utf-8" });
  // npm publish --access public
};

const bat = async (handle: (name: string) => any) => {
  const dirents = readdirSync(Path.resolve(__dirname, "../packages"), {
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
cli.start();
