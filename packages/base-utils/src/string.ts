import { customAlphabet, urlAlphabet } from "nanoid";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const _urlAlphabet =
  urlAlphabet as "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
export enum AlphabetEnum {
  Letters = letters,
  Numbers = numbers,
  //@ts-ignore
  Url = _urlAlphabet,
}

export function nanoidFac(
  size: number = 10,
  alphabet: AlphabetEnum[] = [AlphabetEnum.Letters, AlphabetEnum.Numbers],
): string {
  let _alphabet = alphabet.join("");
  return customAlphabet(_alphabet, size)();
}
