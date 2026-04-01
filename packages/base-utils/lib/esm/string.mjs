import { customAlphabet } from "nanoid";
//#region packages/base-utils/src/string.ts
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(letters + letters.toLowerCase() + "0123456789");
const randomString = nanoid;
//#endregion
export { nanoid, randomString };
