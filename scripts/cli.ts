import { Cli } from "@mcswift/cli";
import { addCommand } from "./add";
import { build } from "./build";
// import { check } from "./check";
import { lint, lintReport } from "./lint";
import { publish } from "./publish";
import { bat } from "./utils";
import { clear } from "./clear";
import { devBuild } from "./dev-build";
const cli = new Cli();
cli.use("build", async (options) => {
  const { pack } = options;
  if (pack === "types") return;
  if (pack) return build(pack as string);
  return bat(build, true);
});

// cli.use("doctor", async (options) => {
//   const { pack } = options;
//   if (pack) return check(pack as string);
//   return bat(check, true);
// });

cli.use("lint", async (options) => {
  const { pack } = options;
  if (pack) {
    const result = await lint(pack as string);
    return lintReport(...result);
  }
  const result = (await bat(lint)).reduce(
    (a, c) => {
      a[0].push(...c[0]);
      a[1].push(...c[1]);
      return a;
    },
    [[], []] as [string[], string[]],
  ) as [string[], string[]];
  return lintReport(...result);
});

cli.use("prepublish", async () => {
  await cli.run(["build", "lint"]);
});
cli.use("publish", async (options) => {
  const { pack } = options;
  if (pack) return publish(pack as string);
  return bat(publish, true);
});
cli.use("clear", async (options) => {
  const { pack } = options;
  if (pack) return clear(pack as string);
  return bat(clear, true);
});
cli.use("dev-build", async (options) => {
  const { pack } = options;
  if (pack) return devBuild(pack as string);
  return bat(devBuild, true);
});
cli.use(addCommand);
cli.start();
