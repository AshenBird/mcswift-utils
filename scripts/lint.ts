import { Logger } from "../packages/base-utils/src";
import { ESLint } from "eslint";
import { getPackageDir,root as _ } from "./utils";
import chalk from "chalk";
// @ts-ignore
import  baseConfig from "../.eslintrc.js"
import { join } from "node:path";
// const cols = process.stdout.columns;
const createLine = (char:string,head:string="")=>{
  const cols =process.stdout.columns 
  const len = cols-head.length
  return head + Array(len).fill(char, 0, len).join("");
}
const createCenterText = ( text:string, char:string=" ")=>{
  const cols =process.stdout.columns 
  const len = cols-text.length
  const half = Math.ceil(len/2)
  const halfFill = Array(half).fill(char, 0, half).join("");
  return halfFill+ text + halfFill;
}
const sp = createLine("-")
const warnLine = createLine(" "," WARN:")
const errorLine = createLine(" "," ERROR:")
export const lint = async (name: string) => {
  const root = getPackageDir(name);
  const linter = new ESLint({
    cwd: root,
    fix: true,
    baseConfig,
    ignore:true,
    ignorePath:join(_,".eslintignore")
  });
  const r = await linter.lintFiles(["**/*.ts"]);
  const errorGroup: string[] = [];
  const warnGroup: string[] = [];
  for (const problem of r) {
    const { errorCount, warningCount, filePath } = problem;
    if (errorCount === 0 && warningCount === 0) continue;
    problem.messages.forEach((m) => {
      const { severity, ruleId, message, line, column } = m;
      const msg = message.split("\n").join("\n            ");
      const situation = `${filePath}:${line}:${column}`;
      const kc = chalk.hex("#dddddd"); //chalk.blueBright
      const c = severity === 1 ? "yellow" : "red";
      const info = `\n · ${chalk.green(ruleId)}\n   ${kc("message:")} ${chalk[
        c
      ](msg)}\n   ${kc("situation:")} ${chalk.gray(situation)}`;
      if (severity === 1) warnGroup.push(info);
      if (severity === 2) errorGroup.push(info);
    });
  }

  // [
  //   'filePath',
  //   'messages',
  //   'suppressedMessages',
  //   'errorCount',
  //   'fatalErrorCount',
  //   'warningCount',
  //   'fixableErrorCount',
  //   'fixableWarningCount',
  //   'source',
  //   'usedDeprecatedRules'
  // ])
  return [warnGroup, errorGroup] as const;
};

export const lintReport = (warnGroup: string[], errorGroup: string[]) => {

  const line1 = "LINT REPORT";
  const sp2 = '\n'+chalk.hex("#111111")(createLine(" ","   "))
  const warnBlock =
    warnGroup.length > 0
      ? `\n${chalk.bgRed.white(warnLine)}${warnGroup.join(sp2)}`
      : "";
  const errorBlock =
    errorGroup.length > 0
      ? `\n${chalk.bgRed.white(errorLine)}${errorGroup.join(sp2)}`
      : "";
  const lastLine = `\n\n   TOTAL: warn ${warnGroup.length}, error ${errorGroup.length}`;
  // const line2 = Array(process.stdout.columns).fill(" " as never,0,process.stdout.columns)
  // \n${chalk.bgRed(line2.join(''))}
  const content = warnGroup.length+errorGroup.length>0
  ?`${warnBlock}${errorBlock}`
  :('\n\n\n'+chalk.green(createCenterText(`Congratulate! You are Clean.`)))
  Logger.debug(
    `${line1}\n${sp}${content}${chalk.gray(lastLine)}\n${sp}`
  );
};
