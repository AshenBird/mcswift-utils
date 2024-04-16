import { StringOption, NumberOption, BooleanOption, ArrayOption } from "./Option";
import { TYPE } from "./const";
import { SchemaInit, Schema, OptionsShape, OptionsInferType, ParseResult } from "./types";




export const string = (): StringOption => {
  return new StringOption();
};
export const number = (): NumberOption => {
  return new NumberOption();
};
export const boolean = (): BooleanOption => {
  return new BooleanOption();
};
export const array = (): ArrayOption => {
  return new ArrayOption();
};

/**
 * 我们约定，`_` 参数必须是字符串数组
 * @param shape
 */
export const options = <T extends SchemaInit = SchemaInit>(
  shape: T
): Schema<T> => {
  const _shape = Object.entries(shape).reduce((r, [k, v]) => {
    // @ts-ignore
    r[k] = v.shape;
    return r;
  }, {} as OptionsShape<T>);
  return {
    shape: _shape,
    check: (val: Record<string, unknown>): val is OptionsInferType<T> => {
      for (const [k, v] of Object.entries(shape)) {
        if (v.shape.required && (!val[k] || (!!v.shape.alias && !val[v.shape.alias]))) {
          return false;
        }
        if (!v.check(val[k])) return false;
      }
      return true;
    },
    parse: (val: Record<string, unknown>): ParseResult<OptionsInferType<T>> => {
      for (const [k, v] of Object.entries(shape)) {
        if (v.shape.required && (!val[k] || (!!v.shape.alias && !val[v.shape.alias]))) {
          return {
            status: false,
            message: v.requiredErrorMessage(k),
            reason: "required",
            data: val,
          };
        }
        if (!v.check(val[k])) {
          return {
            status: false,
            reason: "type",
            message: v.typeErrorMessage(k, val[k]),
            data: val,
          };
        }
      }
      return {
        status: true,
        reason: "none",
        message: "pass",
        data: val as OptionsInferType<T>,
      };
    },

    [TYPE]: {} as OptionsInferType<T>,
  };
};









