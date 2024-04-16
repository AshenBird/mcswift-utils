// packages/cli/src/options/index.ts
import { StringOption, NumberOption, BooleanOption, ArrayOption } from "./Option.mjs";
import { TYPE } from "./const.mjs";
var string = () => {
  return new StringOption();
};
var number = () => {
  return new NumberOption();
};
var boolean = () => {
  return new BooleanOption();
};
var array = () => {
  return new ArrayOption();
};
var options = (shape) => {
  const _shape = Object.entries(shape).reduce((r, [k, v]) => {
    r[k] = v.shape;
    return r;
  }, {});
  return {
    shape: _shape,
    check: (val) => {
      for (const [k, v] of Object.entries(shape)) {
        if (v.shape.required && (!val[k] || !!v.shape.alias && !val[v.shape.alias])) {
          return false;
        }
        if (!v.check(val[k]))
          return false;
      }
      return true;
    },
    parse: (val) => {
      for (const [k, v] of Object.entries(shape)) {
        if (v.shape.required && (!val[k] || !!v.shape.alias && !val[v.shape.alias])) {
          return {
            status: false,
            message: v.requiredErrorMessage(k),
            reason: "required",
            data: val
          };
        }
        if (!v.check(val[k])) {
          return {
            status: false,
            reason: "type",
            message: v.typeErrorMessage(k, val[k]),
            data: val
          };
        }
      }
      return {
        status: true,
        reason: "none",
        message: "pass",
        data: val
      };
    },
    [TYPE]: {}
  };
};
export {
  array,
  boolean,
  number,
  options,
  string
};
