# @mcswift/base-utils




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
