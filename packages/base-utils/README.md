# @mcswift/base-utils

[English](#english) | [中文](#中文)

---

## 中文

基础工具库，提供了一系列跨平台（Node.js/Browser）的实用函数和类。

### 安装

```bash
npm install @mcswift/base-utils
# or
pnpm add @mcswift/base-utils
```

### 功能模块及接口文档

#### 1. Logger 日志工具

提供控制台打印功能（支持不同级别）。支持静态方法和实例化区分 channel 打印。

```typescript
import { Logger } from "@mcswift/base-utils";

// 静态方法打印
Logger.info("This is an info message"); // 打印 INFO 级别
Logger.error(new Error("This is an error")); // 打印 ERROR 级别

// 实例化打印
const myLogger = new Logger("MyChannel");
myLogger.debug("Debug message"); // 输出带有 [MyChannel] 前缀的调试信息
```

**类型注释：**
```typescript
class Logger {
  static log: (info: unknown) => void;
  static info: (info: unknown) => void;
  static error: (info: unknown) => void;
  static warn: (info: unknown) => void;
  static debug: (info: unknown) => void;
  constructor(channel: string);
  log(...args: unknown[]): void;
  info(...args: unknown[]): void;
  error(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  debug(...args: unknown[]): void;
}
```

#### 2. String 字符串工具

提供生成随机字符串的方法。

```typescript
import { nanoid, randomString } from "@mcswift/base-utils";

const id = nanoid(); // 生成默认长度的随机 ID
const random = randomString(10); // 生成指定长度 (10) 的随机字符串
```

**类型注释：**
```typescript
const nanoid: (size?: number) => string;
const randomString: (size?: number) => string;
```

#### 3. Object 对象工具

提供对象的深度冻结和密封。

```typescript
import { deepFreeze, deepSeal } from "@mcswift/base-utils";

const obj = { a: { b: 1 } };
const frozenObj = deepFreeze(obj); // 深度冻结，无法修改、添加、删除任何深层属性
const sealedObj = deepSeal(obj);   // 深度密封，无法添加、删除属性，但可修改现有属性
```

**类型注释：**
```typescript
const deepSeal: <T>(val: T) => T;
const deepFreeze: <T>(val: T) => T;
```

#### 4. JSON 工具

提供更安全的 JSON 序列化和反序列化方法。

```typescript
import { jsonTryParse, toJsonString } from "@mcswift/base-utils";

// 安全解析 JSON
const data = jsonTryParse('{"a": 1}', { a: 0 }); // 解析失败会返回默认值 { a: 0 }

// 安全序列化 JSON
const str = toJsonString({ a: 1 }, "{}"); // 序列化失败会返回 "{}"
```

**类型注释：**
```typescript
const jsonTryParse: (val: string, errorResult?: unknown, reviver?: (this: unknown, key: string, value: unknown) => unknown) => any;
function toJsonString(value: unknown, errorResult?: unknown, replacer?: (this: unknown, key: string, value: unknown) => unknown, space?: string | number): string;
```

#### 5. Other 其他工具

提供基础的深拷贝方法（基于 JSON.stringify）。

```typescript
import { simpleClone } from "@mcswift/base-utils";

const obj = { a: 1 };
const clonedObj = simpleClone(obj);
```

**类型注释：**
```typescript
const simpleClone: (val: unknown) => any;
```

#### 6. GBK 编码转换

提供 GBK 相关的编码和解码。

```typescript
import { GBK } from "@mcswift/base-utils";

const gbkArray = GBK.encode("中文"); // 字符串转 GBK 字节数组
const str = GBK.decode(gbkArray);    // GBK 字节数组转字符串
```

**类型注释：**
```typescript
namespace GBK {
  function decode(arr: number[]): string;
  function encode(str: string): number[];
}
```

#### 7. Pinyin Sort 拼音排序

提供中文字符串获取拼音及按拼音排序的功能。

```typescript
import { Pinyin, instance as pinyinInstance } from "@mcswift/base-utils";

// 获取中文拼音首字母大写形式
const py = pinyinInstance.getFullChars("中文"); // "ZhongWen"

// 比较两个字符串的拼音顺序
const result = Pinyin.comparePyCharCode("阿", "波"); // 返回 -1, 0, 1
```

**类型注释：**
```typescript
class Pinyin {
  constructor(ops?: { checkPolyphone?: boolean; charcase?: string });
  getFullChars(str: string): string;
  getCamelChars(str: string): string;
  static getBeginPinyin: (str: string) => string;
  static getBeginCharAt: (str: string) => number;
  static getPyCharCode: (str: string) => number[];
  static comparePyCharCode: (a: string, b: string) => 0 | 1 | -1;
}
const instance: Pinyin;
```

#### 8. Trigger 事件触发器

一个环境无关的事件触发器（Event Emitter）实现。

```typescript
import { Trigger } from "@mcswift/base-utils";

const trigger = new Trigger<string>();

const key = trigger.on((payload) => {
  console.log("Received:", payload);
});

trigger.dispatch("Hello Trigger!"); // 输出 "Received: Hello Trigger!"
trigger.off(key); // 移除监听
```

**类型注释：**
```typescript
class Trigger<T = undefined> {
  on(callback: (payload: T) => void): symbol;
  once(callback: (payload: T) => void): void;
  off(key: symbol): void;
  off(callback: (payload?: T) => unknown): void;
  dispatch(payload: T): void;
}
```

#### 9. Type 类型判断工具

提供了一系列基于 `typeof` 和原型的类型守卫判断函数。

```typescript
import { isString, isNumber, isValueType } from "@mcswift/base-utils";

console.log(isString("test")); // true
console.log(isNumber(123)); // true
console.log(isValueType(true)); // true (string, number, symbol, boolean, bigint)
```

**类型注释：**
```typescript
const isString: (val: unknown) => val is string;
const isNumber: (val: unknown) => val is number;
const isBigint: (val: unknown) => val is bigint;
const isBoolean: (val: unknown) => val is boolean;
const isFunction: (val: unknown) => val is ((...args: unknown[]) => unknown);
const isSymbol: (val: unknown) => val is symbol;
const isUndefined: (val: unknown) => val is undefined;
const isNull: (val: unknown) => val is null;
const isValueType: (val: unknown) => val is number | string | symbol | boolean | bigint;
```

---

## English

A basic utility library providing a series of cross-platform (Node.js/Browser) utility functions and classes.

### Installation

```bash
npm install @mcswift/base-utils
# or
pnpm add @mcswift/base-utils
```

### Features & Interfaces Documentation

#### 1. Logger Utility

Provides console logging capabilities (supports different log levels). Supports static methods and instance-based channel logging.

```typescript
import { Logger } from "@mcswift/base-utils";

// Static method logging
Logger.info("This is an info message"); // Log INFO level
Logger.error(new Error("This is an error")); // Log ERROR level

// Instance-based logging
const myLogger = new Logger("MyChannel");
myLogger.debug("Debug message"); // Outputs debug info with [MyChannel] prefix
```

**Type Annotations:**
```typescript
class Logger {
  static log: (info: unknown) => void;
  static info: (info: unknown) => void;
  static error: (info: unknown) => void;
  static warn: (info: unknown) => void;
  static debug: (info: unknown) => void;
  constructor(channel: string);
  log(...args: unknown[]): void;
  info(...args: unknown[]): void;
  error(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  debug(...args: unknown[]): void;
}
```

#### 2. String Utility

Provides methods for generating random strings.

```typescript
import { nanoid, randomString } from "@mcswift/base-utils";

const id = nanoid(); // Generate a custom random ID with default length
const random = randomString(10); // Generate a random string of specified length (10)
```

**Type Annotations:**
```typescript
const nanoid: (size?: number) => string;
const randomString: (size?: number) => string;
```

#### 3. Object Utility

Provides deep freeze and deep seal functionalities for objects.

```typescript
import { deepFreeze, deepSeal } from "@mcswift/base-utils";

const obj = { a: { b: 1 } };
const frozenObj = deepFreeze(obj); // Deep freeze, prevents any modification
const sealedObj = deepSeal(obj);   // Deep seal, prevents adding/deleting properties, but existing can be modified
```

**Type Annotations:**
```typescript
const deepSeal: <T>(val: T) => T;
const deepFreeze: <T>(val: T) => T;
```

#### 4. JSON Utility

Provides safer JSON serialization and deserialization methods.

```typescript
import { jsonTryParse, toJsonString } from "@mcswift/base-utils";

// Safely parse JSON
const data = jsonTryParse('{"a": 1}', { a: 0 }); // Returns fallback { a: 0 } if failed

// Safely stringify JSON
const str = toJsonString({ a: 1 }, "{}"); // Returns fallback "{}" if failed
```

**Type Annotations:**
```typescript
const jsonTryParse: (val: string, errorResult?: unknown, reviver?: (this: unknown, key: string, value: unknown) => unknown) => any;
function toJsonString(value: unknown, errorResult?: unknown, replacer?: (this: unknown, key: string, value: unknown) => unknown, space?: string | number): string;
```

#### 5. Other Utilities

Provides a basic deep clone method (based on `JSON.stringify`).

```typescript
import { simpleClone } from "@mcswift/base-utils";

const obj = { a: 1 };
const clonedObj = simpleClone(obj);
```

**Type Annotations:**
```typescript
const simpleClone: (val: unknown) => any;
```

#### 6. GBK Encoding Conversion

Provides GBK related encoding and decoding functions.

```typescript
import { GBK } from "@mcswift/base-utils";

const gbkArray = GBK.encode("中文"); // String to GBK byte array
const str = GBK.decode(gbkArray);    // GBK byte array to string
```

**Type Annotations:**
```typescript
namespace GBK {
  function decode(arr: number[]): string;
  function encode(str: string): number[];
}
```

#### 7. Pinyin Sort

Provides the ability to get Pinyin from Chinese strings and sort by Pinyin.

```typescript
import { Pinyin, instance as pinyinInstance } from "@mcswift/base-utils";

// Get capitalized Pinyin
const py = pinyinInstance.getFullChars("中文"); // "ZhongWen"

// Compare Pinyin character codes
const result = Pinyin.comparePyCharCode("阿", "波"); // Returns -1, 0, 1
```

**Type Annotations:**
```typescript
class Pinyin {
  constructor(ops?: { checkPolyphone?: boolean; charcase?: string });
  getFullChars(str: string): string;
  getCamelChars(str: string): string;
  static getBeginPinyin: (str: string) => string;
  static getBeginCharAt: (str: string) => number;
  static getPyCharCode: (str: string) => number[];
  static comparePyCharCode: (a: string, b: string) => 0 | 1 | -1;
}
const instance: Pinyin;
```

#### 8. Trigger

An environment-agnostic Event Emitter implementation.

```typescript
import { Trigger } from "@mcswift/base-utils";

const trigger = new Trigger<string>();

const key = trigger.on((payload) => {
  console.log("Received:", payload);
});

trigger.dispatch("Hello Trigger!"); // Outputs "Received: Hello Trigger!"
trigger.off(key); // Remove listener
```

**Type Annotations:**
```typescript
class Trigger<T = undefined> {
  on(callback: (payload: T) => void): symbol;
  once(callback: (payload: T) => void): void;
  off(key: symbol): void;
  off(callback: (payload?: T) => unknown): void;
  dispatch(payload: T): void;
}
```

#### 9. Type Guards Utility

Provides a series of type guard functions based on `typeof` and prototypes.

```typescript
import { isString, isNumber, isValueType } from "@mcswift/base-utils";

console.log(isString("test")); // true
console.log(isNumber(123)); // true
console.log(isValueType(true)); // true (string, number, symbol, boolean, bigint)
```

**Type Annotations:**
```typescript
const isString: (val: unknown) => val is string;
const isNumber: (val: unknown) => val is number;
const isBigint: (val: unknown) => val is bigint;
const isBoolean: (val: unknown) => val is boolean;
const isFunction: (val: unknown) => val is ((...args: unknown[]) => unknown);
const isSymbol: (val: unknown) => val is symbol;
const isUndefined: (val: unknown) => val is undefined;
const isNull: (val: unknown) => val is null;
const isValueType: (val: unknown) => val is number | string | symbol | boolean | bigint;
```
