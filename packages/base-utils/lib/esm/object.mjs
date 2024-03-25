// packages/base-utils/src/object.ts
var deepSeal = (val) => {
  return deppHandle(val, Object.seal);
};
var deepFreeze = (val) => {
  return deppHandle(val, Object.freeze);
};
var deppHandle = (val, handle) => {
  handle(val);
  if (typeof val !== "object")
    return val;
  if (Array.isArray(val)) {
    for (const child of val) {
      handle(child);
    }
    return val;
  }
  for (const child of Object.values(val)) {
    handle(child);
  }
  return val;
};
export {
  deepFreeze,
  deepSeal
};
