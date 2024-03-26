import { char_dict, full_dict, polyphone } from "./data";

// export const Pinyin = function (ops) {
//   this.initialize(ops);
// };
const letter_reg = /^[A-Z]$/;
type PinyinOption = {
  checkPolyphone?: boolean;
  charcase?: string;
};

const options = {
  checkPolyphone: false,
  charcase: "default",
};
export class Pinyin {
  options: PinyinOption;
  char_dict: string;
  full_dict: Record<string, string>;
  polyphone: Record<string, string>;
  constructor(ops: PinyinOption = {}) {
    this.options = {
      ...options,
      ...ops,
    };
    this.char_dict = char_dict;
    this.full_dict = full_dict;
    this.polyphone = polyphone;
  }

  // 提取拼音, 返回首字母大写形式
  getFullChars(str: string) {
    let result = "";
    let name;
    // const reg = new RegExp("[a-zA-Z0-9- ]");
    for (let i = 0, len = str.length; i < len; i++) {
      const ch = str.substr(i, 1),
        unicode = ch.charCodeAt(0);
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
  getCamelChars(str: string) {
    str = str + "";
    if (typeof str !== "string")
      throw new Error("函数getFisrt需要字符串类型参数!");
    const chars:string[] = []; //保存中间结果的数组
    for (let i = 0, len = str.length; i < len; i++) {
      //获得unicode码
      const ch = str.charAt(i);
      //检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理
      chars.push(this._getChar(ch));
    }
    //处理arrResult,返回所有可能的拼音首字母串数组
    return this._getResult(chars);
  }

  // 提取拼音
  _getFullChar(str: string) {
    for (const key in this.full_dict) {
      if (-1 !== this.full_dict[key].indexOf(str)) {
        return this._capitalize(key);
      }
    }
    return false;
  }

  // 首字母大写
  _capitalize(str: string) {
    if (str.length > 0) {
      const first = str.substr(0, 1).toUpperCase();
      const spare = str.substr(1, str.length);
      return first + spare;
    }
  }

  _getChar(ch: string) {
    const unicode = ch.charCodeAt(0);
    //如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数
    if (unicode > 40869 || unicode < 19968) return ch; //dealWithOthers(ch);
    //检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母
    if (!this.options.checkPolyphone)
      return this.char_dict.charAt(unicode - 19968);
    return this.polyphone[unicode]
      ? this.polyphone[unicode]
      : this.char_dict.charAt(unicode - 19968);
  }

  _getResult(chars: string[]) {
    if (!this.options.checkPolyphone) return chars.join("");
    let result = [""];
    for (let i = 0, len = chars.length; i < len; i++) {
      const str = chars[i],
        strlen = str.length;
      if (strlen == 1) {
        for (let j = 0; j < result.length; j++) {
          result[j] += str;
        }
      } else {
        const swap1 = result.slice(0);
        result = [];
        for (let j = 0; j < strlen; j++) {
          //复制一个相同的arrRslt
          const swap2 = swap1.slice(0);
          //把当前字符str[k]添加到每个元素末尾
          for (let k = 0; k < swap2.length; k++) {
            swap2[k] += str.charAt(j);
          }
          //把复制并修改后的数组连接到arrRslt上
          result = result.concat(swap2);
        }
      }
    }
    return result.join("");
  }
  static fn = Pinyin.prototype;
  static getBeginPinyin = (str: string) => {
    const py = instance.getCamelChars(str);
    let letter = py.slice(0, 1).toUpperCase();
    if (!letter_reg.test(letter)) {
      letter = "#";
    }
    return letter;
  };
  static getBeginCharAt = (str: string) => {
    const py = instance.getCamelChars(str);
    let letter = py.slice(0, 1).toUpperCase();
    if (!letter_reg.test(letter)) {
      letter = "#";
    }
    return letter.charCodeAt(0);
  };
  static getPyCharCode = (str: string) => {
    const py = instance.getCamelChars(str).toUpperCase();
    let result:number[] = [];
    for (let i = 0; i < py.length; i++) {
      result.push(py.charCodeAt(i));
    }
    return result;
  };
  static comparePyCharCode = (a: string, b: string) => {
    const _a = Pinyin.getPyCharCode(a);
    const _b = Pinyin.getPyCharCode(b);
    for (let i = 0; ; i++) {
      if (a.length === b.length && i >= a.length) return 0;
      if (a.length > b.length && i >= a.length) {
        return 1;
      }
      if (a.length < b.length && i >= b.length) {
        return -1;
      }
      if (_a[i] === _b[i]) continue;
      if (_a[i] > _b[i]) {
        return 1;
      } else {
        return -1;
      }
    }
  };
  static data_letter_sort = function (
    data: Record<string, string>[],
    name: string
  ) {
    // 判空
    if (data.length === 0 || !Array.isArray(data)) {
      return { tag: [], list: [] };
    }
    // 遍历获得py
    for (let i in data) {
      data[i].py = instance.getCamelChars(data[i][name]);
    }
    let letter = "";
    const list: Record<string, unknown[]> = {};
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
        data: list[key],
      });
    }
    resault.sort(function (x, y) {
      return x.letter.charCodeAt(0) - y.letter.charCodeAt(0);
    });
    // # 号分组 放最后
    const last_arr = resault[0];
    if (last_arr.letter === "#") {
      resault.splice(0, 1);
      resault.push(last_arr);
    }
    const letterArr: unknown[] = [];
    resault.forEach((item) => {
      if (!letterArr.includes(item.letter)) {
        letterArr.push(item.letter);
      }
    });
    return { tag: letterArr, list: resault };
  };
}

export const instance = new Pinyin();


