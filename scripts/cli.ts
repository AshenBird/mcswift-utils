import { Cli } from "../packages/cli/src";
import { build } from "./build";
import { check } from "./check";
import { lint, lintReport } from "./lint";
import { publish } from "./publish";
import { bat } from "./utils";
const cli = new Cli();
cli.use("build", (options) => {
  const { pack } = options;
  if (pack === "types") return;
  if (pack) return build(pack as string);
  bat(build);
});
cli.use("doctor", (options) => {
  const { pack } = options;
  if (pack) return check(pack as string);
  bat(check);
});
cli.use("lint", async (options) => {
  const { pack } = options;
  if (pack) {
    const result = await lint(pack as string);
    lintReport(...result);
    return;
  }
  const result = (await bat(lint)).reduce((a,c)=>{
    a[0].push(...c[0])
    a[1].push(...c[1])
    return a
  },[[],[]] as [string[],string[] ])as [string[],string[]];
  lintReport(...result)
});

cli.use("publish", publish);
cli.start();
