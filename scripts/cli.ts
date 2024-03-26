import { Cli } from "../packages/cli/src";
import { build } from "./build";
import { check } from "./check";
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

cli.use("publish", publish);
cli.start();
