import { Logger } from "@mcswift/base-utils";
import { argv } from "node:process";
import { Command, isCommand } from "./Command";
import type { Handle, Options, CommandInit, Schema } from "./types";
import { splitOptions } from "./utils";
// const HELP = Symbol("help");
// const README = Symbol("readme");

export class Cli {
  readonly name: string;
  private _readme?: string;
  get readme() {
    return this._readme;
  }
  constructor(name: string = "") {
    this.name = name;
    // this._use(HELP, this.help.bind(this));
    // this._use(README, this.readme.bind(this));
  }
  private map = new Map<string | symbol, Command | Handle<Options>>();
  setReadme(readme: string) {
    this._readme = readme;
    return this;
  }
  /**
   *
   * @param name
   * @param handle
   * @param schema
   */
  use<T extends Options>(init: CommandInit<T>): this;
  /**
   * @param command
   */
  use<T extends Options>(command: Command<T>): this;
  use(name: string, handle: Handle<Options>): this;
  use(name: string, handle: Handle<Options>, schema?: Schema<Options>): this;
  use<T extends Options>(
    arg1: CommandInit<T> | Command<T> | string,
    arg2?: Handle<T>,
    arg3?: Schema<T>,
  ) {
    if (typeof arg1 === "string") {
      if (!arg2) throw null as never;
      if (!arg3) {
        this.map.set(arg1, arg2 as Handle<Options>);
      } else {
        const command = new Command<T>({
          name: arg1,
          handle: arg2,
          schema: arg3,
        });
        this.map.set(command.name, command as unknown as Command);
      }
      return this;
    }
    if (arg1 instanceof Command) {
      this.map.set(arg1.name, arg1 as unknown as Command);
      return this;
    }
    const command = new Command<T>(arg1);
    this.map.set(command.name, command as unknown as Command);
    return this;
  }

  help() {
    Logger.info(`Usage: ${this.name} [options]`);
    Logger.info(`Options:`);
    for (const command of this.map.values()) {
      if (!isCommand(command)) return;
      Logger.info(`  ${command.name}`);
      Logger.info(`    ${command.description}`);
    }
    // @todo 输出 命令列表
  }
  showReadme() {
    Logger.info(this.readme || "");
  }
  banner() {}
  async run(name: string | string[], args: string[] = []) {
    if (!Array.isArray(name)) return this._run(name, args);
    for (const n of name) {
      await this._run(n, args);
    }
    return this;
  }
  private async _run(name: string, args: string[] = []) {
    const command = this.map.get(name);
    if (!command) {
      if (command === "help") return this.help();
      if (command === "readme") return this.showReadme();
      Logger.warn(`Can't found ${name} command. Please check you input.`);
      return this;
    }
    let _options = splitOptions(args);
    // 校验
    if (command instanceof Command && command.schema) {
      const result = command.schema.parse(args);
      _options = result;
    }

    // 执行
    if (command instanceof Command) await command.handle(_options, this);
    else await command(_options, this);
    return this;
  }
  start() {
    const [_node, _entry, name, ...args] = argv;
    // const options = splitOptions(args);
    this.run(name, args).catch(() => {});
    // this.run(name, args);
  }
}
