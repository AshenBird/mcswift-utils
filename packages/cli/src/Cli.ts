import { Logger } from "@mcswift/base-utils";
import { argv } from "process";
import { resolveCliOption } from ".";
import { Command } from "./Command";
import { COS, CH, CO } from "./types";
const HELP = Symbol("help");
const README = Symbol("readme");

export class Cli {
  readonly name: string;
  constructor(name: string = "") {
    this.name = name;
    this._use(HELP, this.help.bind(this));
    this._use(README, this.readme.bind(this));
  }
  private map = new Map<string | symbol, Command>();

  /*--- inner use ----*/
  /**
   *
   * @param name
   * @param handle
   * @param schema
   */
  private _use<T extends COS = COS>(
    name: string | symbol,
    handle: CH<T>,
    schema?: T
  ): void;
  /**
   *
   * @param command
   */
  private _use<T extends COS = COS>(command: Command<T>): void;
  private _use<T extends COS = COS>(
    arg1: string | symbol | Command<T>,
    arg2?: CH<T>,
    arg3?: T
  ) {
    const command =
      arg1 instanceof Command
        ? arg1
        : new Command({
            name: arg1,
            handle: arg2 as CH<T>,
            schema: arg3,
          });

    this.map.set(command.name, command as unknown as Command);
  }

  /**
   *
   * @param name
   * @param handle
   * @param schema
   */
  use<T extends COS = COS>(name: string, handle: CH<T>, schema?: T): void;
  /**
   *
   * @param command
   */
  use<T extends COS = COS>(command: Command<T>): void;
  use<T extends COS = COS>(arg1: string | Command<T>, arg2?: CH<T>, arg3?: T) {
    if (typeof arg1 === "string") {
      return this._use(arg1, arg2 as CH<T>, arg3);
    }
    return this._use(arg1);
  }
  help() {}
  readme() {}
  async run(name: string | string[], options: CO = {}) {
    if (!Array.isArray(name)) return this._run(name, options);
    for (const n of name) {
      await this._run(n, options);
    }
    return this;
  }
  async _run(name: string, options: CO = {}) {
    const command = this.map.get(name);
    if (!command) {
      Logger.warn(`Can't found ${name} command. Please check you input.`);
      return this;
    }
    let _options = options;
    // 校验
    if (command.schema) {
        const result = command.schema.safeParse(options);
        if(!result.success){
          for (const [field,errs ]of Object.entries(result.error.formErrors.fieldErrors)){
            Logger.error(`${field}: ${errs?.join("\n           ")}`)
          }
          return 
        }
        _options = result.data
    }
    // 执行
    await command.handle(_options,this);
    return this;
  }
  start() {
    const [_node, _entry, name, ...args] = argv;
    const options = resolveCliOption(args);
    this.run(name, options);
  }
}
