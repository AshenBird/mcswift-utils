// packages/base-utils/src/string.ts
import { customAlphabet } from "nanoid";
var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "0123456789";
var alphabet = letters + letters.toLowerCase() + numbers;
var nanoid = customAlphabet(alphabet);
var randomString = nanoid;
export {
  nanoid,
  randomString
};
