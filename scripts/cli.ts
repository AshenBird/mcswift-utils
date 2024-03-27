import { Cli } from "../packages/cli/src";
import { addCommand } from "./add";
import { build } from "./build";
import { check } from "./check";
import { lint, lintReport } from "./lint";
import { publish } from "./publish";
import { bat } from "./utils";
const cli = new Cli();
cli.use("build", async (options) => {
  const { pack } = options;
  if (pack === "types") return;
  if (pack) return build(pack as string);
  return bat(build);
});
cli.use("doctor",async (options) => {
  const { pack } = options;
  if (pack) return check(pack as string);
  return bat(check);
});
cli.use("lint", async (options) => {
  const { pack } = options;
  if (pack) {
    const result = await lint(pack as string);
    return lintReport(...result);
  }
  const result = (await bat(lint)).reduce((a,c)=>{
    a[0].push(...c[0])
    a[1].push(...c[1])
    return a
  },[[],[]] as [string[],string[] ])as [string[],string[]];
  return lintReport(...result)
});
cli.use("prepublish",()=>{
  cli.run(["build","doctor","lint"])
})
cli.use("publish", publish);
cli.use(addCommand)
cli.start();
