// packages/base-utils/src/pinyin-sort/index.ts
import { char_dict, full_dict, polyphone } from "./data.mjs";
var letter_reg = /^[A-Z]$/;
var options = {
  checkPolyphone: false,
  charcase: "default"
};
var Pinyin = class _Pinyin {
  options;
  char_dict;
  full_dict;
  polyphone;
  constructor(ops = {}) {
    this.options = {
      ...options,
      ...ops
    };
    this.char_dict = char_dict;
    this.full_dict = full_dict;
    this.polyphone = polyphone;
  }
  // 提取拼音, 返回首字母大写形式
  getFullChars(str) {
    let result = "";
    let name;
    for (let i = 0, len = str.length; i < len; i++) {
      const ch = str.substr(i, 1), unicode = ch.charCodeAt(0);
      if (unicode > 40869 || unicode < 19968) {
        result += ch;
      } else {
        name = this._getFullChar(ch);
        if (name !== false) {
          result += name;
        }
      }
    }
    return result;
  }
  // 提取首字母，返回大写形式
  getCamelChars(str) {
    str = str + "";
    if (typeof str !== "string")
      throw new Error("\u51FD\u6570getFisrt\u9700\u8981\u5B57\u7B26\u4E32\u7C7B\u578B\u53C2\u6570!");
    const chars = [];
    for (let i = 0, len = str.length; i < len; i++) {
      const ch = str.charAt(i);
      chars.push(this._getChar(ch));
    }
    return this._getResult(chars);
  }
  // 提取拼音
  _getFullChar(str) {
    for (const key in this.full_dict) {
      if (-1 !== this.full_dict[key].indexOf(str)) {
        return this._capitalize(key);
      }
    }
    return false;
  }
  // 首字母大写
  _capitalize(str) {
    if (str.length > 0) {
      const first = str.substr(0, 1).toUpperCase();
      const spare = str.substr(1, str.length);
      return first + spare;
    }
  }
  _getChar(ch) {
    const unicode = ch.charCodeAt(0);
    if (unicode > 40869 || unicode < 19968)
      return ch;
    if (!this.options.checkPolyphone)
      return this.char_dict.charAt(unicode - 19968);
    return this.polyphone[unicode] ? this.polyphone[unicode] : this.char_dict.charAt(unicode - 19968);
  }
  _getResult(chars) {
    if (!this.options.checkPolyphone)
      return chars.join("");
    let result = [""];
    for (let i = 0, len = chars.length; i < len; i++) {
      const str = chars[i], strlen = str.length;
      if (strlen == 1) {
        for (let j = 0; j < result.length; j++) {
          result[j] += str;
        }
      } else {
        const swap1 = result.slice(0);
        result = [];
        for (let j = 0; j < strlen; j++) {
          const swap2 = swap1.slice(0);
          for (let k = 0; k < swap2.length; k++) {
            swap2[k] += str.charAt(j);
          }
          result = result.concat(swap2);
        }
      }
    }
    return result.join("");
  }
  static fn = _Pinyin.prototype;
  static getBeginPinyin = (str) => {
    const py = instance.getCamelChars(str);
    let letter = py.slice(0, 1).toUpperCase();
    if (!letter_reg.test(letter)) {
      letter = "#";
    }
    return letter;
  };
  static getBeginCharAt = (str) => {
    const py = instance.getCamelChars(str);
    let letter = py.slice(0, 1).toUpperCase();
    if (!letter_reg.test(letter)) {
      letter = "#";
    }
    return letter.charCodeAt(0);
  };
  static getPyCharCode = (str) => {
    const py = instance.getCamelChars(str).toUpperCase();
    let result = [];
    for (let i = 0; i < py.length; i++) {
      result.push(py.charCodeAt(i));
    }
    return result;
  };
  static comparePyCharCode = (a, b) => {
    const _a = _Pinyin.getPyCharCode(a);
    const _b = _Pinyin.getPyCharCode(b);
    for (let i = 0; ; i++) {
      if (a.length === b.length && i >= a.length)
        return 0;
      if (a.length > b.length && i >= a.length) {
        return 1;
      }
      if (a.length < b.length && i >= b.length) {
        return -1;
      }
      if (_a[i] === _b[i])
        continue;
      if (_a[i] > _b[i]) {
        return 1;
      } else {
        return -1;
      }
    }
  };
  static data_letter_sort = function(data, name) {
    if (data.length === 0 || !Array.isArray(data)) {
      return { tag: [], list: [] };
    }
    for (let i in data) {
      data[i].py = instance.getCamelChars(data[i][name]);
    }
    let letter = "";
    const list = {};
    for (let i = 0; i < data.length; i++) {
      letter = data[i]["py"].slice(0, 1).toUpperCase();
      if (!letter_reg.test(letter)) {
        letter = "#";
      }
      if (!(letter in list)) {
        list[letter] = [];
      }
      list[letter].push(data[i]);
    }
    const resault = new Array();
    for (const key in list) {
      resault.push({
        letter: key,
        data: list[key]
      });
    }
    resault.sort(function(x, y) {
      return x.letter.charCodeAt(0) - y.letter.charCodeAt(0);
    });
    const last_arr = resault[0];
    if (last_arr.letter === "#") {
      resault.splice(0, 1);
      resault.push(last_arr);
    }
    const letterArr = [];
    resault.forEach((item) => {
      if (!letterArr.includes(item.letter)) {
        letterArr.push(item.letter);
      }
    });
    return { tag: letterArr, list: resault };
  };
};
var instance = new Pinyin();
export {
  Pinyin,
  instance
};
