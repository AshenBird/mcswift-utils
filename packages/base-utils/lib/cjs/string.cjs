Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("./_virtual/_rolldown/runtime.cjs");
let nanoid = require("nanoid");
//#region packages/base-utils/src/string.ts
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabet = letters + letters.toLowerCase() + "0123456789";
const nanoid$1 = (0, nanoid.customAlphabet)(alphabet);
const randomString = nanoid$1;
//#endregion
exports.nanoid = nanoid$1;
exports.randomString = randomString;
