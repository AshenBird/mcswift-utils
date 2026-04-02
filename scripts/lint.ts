import { getPackageDir, root as _ } from "./utils";
import chalk from "chalk";
import { join } from "node:path";
import { Logger } from "../packages/base-utils/src";
import { spawnSync } from "node:child_process";
import * as process from "node:process";
import { getCommandFile } from "../packages/node/src";
const createLine = (char: string, head: string = "") => {
  const cols = process.stdout.columns;
  const len = cols - head.length;
  return head + Array(len).fill(char, 0, len).join("");
};
const createCenterText = (text: string, char: string = " ") => {
  const cols = process.stdout.columns;
  const len = cols - text.length;
  const half = Math.ceil(len / 2);
  const halfFill = Array(half).fill(char, 0, half).join("");
  return halfFill + text + halfFill;
};
const sp = createLine("-");
const warnLine = createLine(" ", " WARN:");
const errorLine = createLine(" ", " ERROR:");
export const lint = async (name: string): Promise<[string[], string[]]> => {
  return oxclint(name);
};
const oxclint = async (name: string) => {
  const root = getPackageDir(name);
  const oxlintPath = getCommandFile("oxlint", root);
  if (!oxlintPath) return [[], []] as [string[], string[]];
  const { status, output } = spawnSync(oxlintPath, [".", "-f", "json"], {
    cwd: root,
    encoding: "utf-8",
    shell: true,
  });
  if (status !== 0) return [[], []] as [string[], string[]];
  const resultRaw = output.map((item) => (item ? item : "")).join("");
  const result = JSON.parse(resultRaw);
  const warnGroup: string[] = [];
  const errorGroup: string[] = [];
  for (const item of result.diagnostics) {
    const { help, code, url, message, filename, severity, labels } = item;
    const { label, span } = labels[0];
    const { line, column } = span;
    const filePath = join(root, filename);
    const situation = `${filePath}:${line}:${column}`;
    const msg = `${message}${label ? `(${label})` : ""}`;
    const kc = chalk.hex("#dddddd"); //chalk.blueBright
    const c = severity === "warning" ? "yellow" : "red";
    const lines = [
      `\n · ${chalk.green(code)}`,
      `\n   ${kc("message:")} ${chalk[c](msg)}`,
      `\n   ${kc("situation:")} ${chalk.gray(situation)}`,
      `\n   ${kc("help:")} ${help}`,
      `\n   ${kc("url:")} ${url}`,
    ];
    const info = lines.join("\n");
    if (severity === "warning") warnGroup.push(info);
    if (severity === "error") errorGroup.push(info);
  }
  return [warnGroup, errorGroup] as [string[], string[]];
};

export const lintReport = (warnGroup: string[], errorGroup: string[]) => {
  const line1 = "LINT REPORT";
  const sp2 = "\n" + chalk.hex("#111111")(createLine(" ", "   "));
  const warnBlock =
    warnGroup.length > 0
      ? `\n${chalk.bold(chalk.bgRgb(222, 150, 0).black(warnLine))}${warnGroup.join(sp2)}`
      : "";
  const errorBlock =
    errorGroup.length > 0
      ? `\n${chalk.bgRed.white.bold(errorLine)}${errorGroup.join(sp2)}`
      : "";
  const lastLine = `\n\n   TOTAL: warn ${chalk.yellow(warnGroup.length)}, error ${chalk.red(errorGroup.length)}`;
  // const line2 = Array(process.stdout.columns).fill(" " as never,0,process.stdout.columns)
  // \n${chalk.bgRed(line2.join(''))}
  const content =
    warnGroup.length + errorGroup.length > 0
      ? `${warnBlock}${errorBlock}`
      : "\n\n\n" +
        chalk.green(createCenterText(`Congratulate! You are Clean.`));
  Logger.debug(`${line1}\n${sp}${content}${chalk.gray(lastLine)}\n${sp}`);
};
