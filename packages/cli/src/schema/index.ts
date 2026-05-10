import { CheckResult, OptionItem, Options, Schema, SchemaInit } from "../types";
import { splitOptions } from "../utils";
import console from "node:console";

export class InnerSchema<O extends Options> implements Schema<O> {
  private options: OptionItem[];
  constructor({ options }: SchemaInit) {
    this.options = options;
  }
  private resolveOption(raw: string[]) {
    return splitOptions(raw);
  }
  check(options: Options) {
    const resuslt: CheckResult = {
      status: "pass",
      errors: [],
    };
    for (const option of this.options) {
      const { name, required = false, type } = option;
      const value = options[name];
      if (required && typeof value === "undefined") {
        // 缺少必要参数
        resuslt.status = "fail";
        resuslt.errors.push({
          option: name,
          value: undefined,
          message: `Option ${name} is required`,
          type: "miss required",
        });
      }
      if (!value || typeof value !== type) {
        // 类型错误
        resuslt.status = "fail";
        resuslt.errors.push({
          option: name,
          value: options[name],
          message: `Option ${name} is not ${type}`,
          type: "wrong type",
        });
      }
    }
    return resuslt;
  }
  parse(raw: string[]): O {
    const options = this.resolveOption(raw);
    const checkResult = this.check(options);
    if (checkResult.status === "fail") {
      //@ts-ignore
      console.error(checkResult.errors);
      throw null;
    }
    return options as O;
  }
}

export const createSchema = (options: SchemaInit) => {
  return new InnerSchema(options);
};
