import { Logger } from "../packages/base-utils/src";
import { mandatoryFileExtensionsPlugin } from "../packages/esbuild/src";
import { getFilePaths } from "../packages/node/src";
import { generatorDeclare } from "../packages/tsc/src";
import { join } from "path";
import { build as _build } from "esbuild";
import { rm } from "fs/promises";
import { getPackageDir } from "./utils";
import { pathToFileURL } from "url";
import { existsSync } from "node:fs";
import { emptyDirSync, ensureDirSync } from "fs-extra";
export const build = async (name: string) => {
  if (name === "types") return;
  
  const root = getPackageDir(name)
  if (!existsSync(root)) {
    throw new Error(`can't found ${name} package`);
  }
  const childBuildScript = join(root,"scripts/build.ts")
  // 使用子包自定义构建脚本
  if (existsSync(childBuildScript)){
    import(pathToFileURL(childBuildScript).toString())
    return
  }
  Logger.log(`@mcswift/${name} BUILD BEGIN`);
  const out = join(root, "lib");
  const src = join(root, "src");
  const cjs = join(out, "cjs");
  const esm = join(out, "esm");
  const types = join(root, "types");
  const fileList = getFilePaths(src).filter((val) => !val.endsWith("md"));
  ensureDirSync(out);
  emptyDirSync(out);
  ensureDirSync(esm);
  ensureDirSync(cjs);
  ensureDirSync(types);
  emptyDirSync(types);
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
  const buildInfoPath = join(root, "tsconfig.tsbuildinfo");
  if (existsSync(buildInfoPath)) {
    tasks.push(rm(buildInfoPath));
  }
  await Promise.all(tasks);
  Logger.log(`@mcswift/${name} BUILD FINISH`);
};