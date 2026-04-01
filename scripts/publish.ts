import { execSync } from "child_process";
import { root } from "./utils";

export const publish = async () => {
  execSync(`cd ${root} && pnpm publish -r --access public`, {
    encoding: "utf-8",
  });
};
