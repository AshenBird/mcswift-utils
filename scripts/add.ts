import { z } from "zod";
import { Cli, Command } from "../packages/cli/src";
import { createFileSync, ensureDir, ensureDirSync } from "fs-extra";
import { getPackageDir } from "./utils";
import { existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
const schema = z.object({
  name: z.string().describe("create package and dir as this name"),
});
type AddOptions = z.infer<typeof schema>;
const add = ({ name }: AddOptions,cli:Cli) => {
  const root = getPackageDir(name)
  ensureDirSync(root);
  if(existsSync(join(root,"package.json"))){
    return
  }
  execSync("pnpm init",{
    cwd:root
  })
  cli.run("doctor")
};

export const addCommand = new Command({
  name: "add",
  handle: add,
  schema,
});
