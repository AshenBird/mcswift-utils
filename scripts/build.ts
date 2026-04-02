import { Logger } from "../packages/base-utils/src";
import { join } from "path";
import { getPackageDir, root } from "./utils";
import { existsSync } from "node:fs";
import { emptyDirSync, ensureDirSync } from "fs-extra";
import { build as tsdownBuild } from "tsdown";
import { getFilePaths } from "../packages/node/src";
import { NpmPackage } from "../packages/npm/src";
import { spawn } from "child_process";
// import console from "node:console";
// import { NPM } from "@mcswift/types";
export const build = async (name: string) => {
  //   if (name === "types") return;

  const packDirPath = getPackageDir(name);
  if (!existsSync(packDirPath)) {
    throw new Error(`can't found ${name} package`);
  }
  const packInfoInst = new NpmPackage(packDirPath);
  const packScripts = packInfoInst.getPackageInfo().scripts;
  if (packScripts && packScripts["build"]) {
    // 如果子包存在build脚本，直接调用
    const { resolve, reject, promise } = Promise.withResolvers<void>();
    spawn("pnpm", ["run", "build"], { stdio: "inherit", cwd: packDirPath }).on(
      "exit",
      (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`build ${name} failed`));
        }
      },
    );
    return promise;
  }
  Logger.log(`@mcswift/${name} BUILD BEGIN`);
  const src = join(packDirPath, "src");
  const out = join(packDirPath, "lib");
  const cjs = join(out, "cjs");
  const esm = join(out, "esm");
  ensureDirSync(out);
  emptyDirSync(out);
  ensureDirSync(esm);
  ensureDirSync(cjs);
  const tasks: Promise<unknown>[] = [];
  const fileList = getFilePaths(src).filter((val) => !val.endsWith("md"));
  // 构建cjs
  tasks.push(
    tsdownBuild({
      entry: fileList,
      dts: true,
      format: {
        cjs: {
          outDir: cjs,
        },
        esm: {
          outDir: esm,
        },
      },
      platform: "node",
      target: ["node20"],
      unbundle: true,
      deps: {
        skipNodeModulesBundle: true,
        neverBundle: (path) => path.startsWith("@mcswift/"),
      },
    }),
  );
  const workspacePackInst = new NpmPackage(root);

  const info = packInfoInst.getPackageInfo();
  const exps = info.exports;
  if (!exps) {
    throw new Error(`can't found exports in ${name} package`);
  }
  await Promise.all(tasks);
  const newExps = {} as Record<string, any>;
  for (const key of Object.keys(exps)) {
    const fileName = key === "." ? "index" : key.replace("./", "");
    newExps[key] = {
      import: `./lib/esm/${fileName}.mjs`,
      require: `./lib/cjs/${fileName}.cjs`,
    };
  }
  packInfoInst.setPackageInfo("exports", newExps);
  // packInfoInst.deletePackageInfo("scripts");
  const repository = workspacePackInst.getPackageInfo().repository;
  packInfoInst.setPackageInfo("repository", {
    type: "git",
    url: (repository as { url: string }).url,
    directory: `packages/${name}`,
  });
  packInfoInst.setPackageInfo("author", {
    name: "McSwift",
    email: "hi@mcswift.cn",
  });
  packInfoInst.setPackageInfo("license", "MIT");
  packInfoInst.setPackageInfo("files", ["lib/**/*"]);
  const version = workspacePackInst.getPackageInfo().version;
  packInfoInst.setPackageInfo("version", version as string);
  Logger.log(`@mcswift/${name} BUILD FINISH`);
};
