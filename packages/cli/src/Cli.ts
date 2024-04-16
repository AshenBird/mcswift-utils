import { Logger } from "@mcswift/base-utils";
import { argv } from "process";
import { resolveCliOption } from ".";
import { Command } from "./Command";
import type{ Handle, Options,Schema, CommandInit } from "./types";
const HELP = Symbol("help");
const README = Symbol("readme");

export class Cli {
  readonly name: string;
  constructor(name: string = "") {
    this.name = name;
    // this._use(HELP, this.help.bind(this));
    // this._use(README, this.readme.bind(this));
  }
  private map = new Map<string | symbol, Command|Handle>();

  /**
   *
   * @param name
   * @param handle
   * @param schema
   */
  use<T extends Schema = Schema>(
    init:CommandInit<T>
  ): this;
  /**
   * @param command
   */
  use<T extends Schema = Schema>(
    command: Command<T>
  ): this;
  
  use(
    name: string,
    handle:Handle
  ): this;
  use<T extends Schema = Schema>(
    arg1:CommandInit<T>|Command<T>|string,
    arg2?:Handle
  ) {
    if(typeof arg1 === "string"){
      if(!arg2) throw null as never
      this.map.set(arg1,arg2)
      return this
    }
    if(arg1 instanceof Command){
      this.map.set(arg1.name, arg1 as unknown as Command);
      return this
    }
    const  command = new Command<T>(arg1)
    this.map.set(command.name, command as unknown as Command);
    return this
  }

  help() {
    // @todo 输出 命令列表
  }
  readme() {
    // @todo 输出 自述文件
  }
  banner() {}
  async run(name: string | string[], options: Options = {}) {
    if (!Array.isArray(name)) return this._run(name, options);
    for (const n of name) {
      await this._run(n, options);
    }
    return this;
  }
  private async _run(name: string, options: Options = {}) {
    const command = this.map.get(name);
    if (!command) {
      if( command === "help" )return this.help();
      if( command === "readme" )return this.readme();
      Logger.warn(`Can't found ${name} command. Please check you input.`);
      return this;
    }
    let _options = options;
    // 校验
    if (command instanceof Command && command.schema) {
      const result = command.schema.parse(options);
      if (!result.status) {
        // @todo
        // for (const [field, errs] of Object.entries(
        //   result.error.formErrors.fieldErrors
        // )) {
        //   Logger.error(`${field}: ${errs?.join("\n           ")}`);
        // }
        return;
      }
      _options = result.data;
    }
    
    // 执行
    if(command instanceof Command)await command.handle(_options, this);
    else await command(_options,this)
    return this;
  }
  start() {
    const [_node, _entry, name, ...args] = argv;
    const options = resolveCliOption(args);
    this.run(name, options);
  }
}
