import { join } from "node:path";
import { getPackageDir } from "./utils";
import { rm } from "node:fs/promises";
import { existsSync } from "node:fs";

export const clear = async (name: string) => {
  const root = getPackageDir(name);
  const distPath = join(root, "dist");
  const libPath = join(root, "lib");
  const typesPath = join(root, "types");
  if (await existsSync(typesPath)) {
    await rm(typesPath, { recursive: true });
  }
  if (await existsSync(libPath)) {
    await rm(libPath, { recursive: true });
  }
  if (await existsSync(distPath)) {
    await rm(distPath, { recursive: true });
  }
};
