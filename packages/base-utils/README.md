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

### 功能模块及使用文档

#### 1. Logger 日志工具

提供控制台打印功能（支持不同级别）。

```typescript
import { Logger } from "@mcswift/base-utils";

Logger.info("This is an info message");
Logger.error(new Error("This is an error"));
```

#### 2. String 字符串工具

提供生成随机字符串的方法。

```typescript
import { nanoid, randomString } from "@mcswift/base-utils";

const id = nanoid(); // 生成自定义随机 ID
const random = randomString(10); // 生成指定长度的随机字符串
```

#### 3. Object 对象工具

提供对象的深度冻结和密封。

```typescript
import { deepFreeze, deepSeal } from "@mcswift/base-utils";

const obj = { a: { b: 1 } };
const frozenObj = deepFreeze(obj); // 深度冻结
const sealedObj = deepSeal(obj);   // 深度密封
```

#### 4. Other 其他工具

提供基础的深拷贝方法（基于 JSON.stringify）。

```typescript
import { simpleClone } from "@mcswift/base-utils";

const obj = { a: 1 };
const clonedObj = simpleClone(obj);
```

#### 5. GBK 编码转换

提供 GBK 相关的编码和解码。

```typescript
import { GBK } from "@mcswift/base-utils";

// GBK 相关处理
```

#### 6. Pinyin Sort 拼音排序

提供中文字符串按拼音排序的功能。

```typescript
import { pinyinSort } from "@mcswift/base-utils";

// 拼音排序
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

### Features & Documentation

#### 1. Logger Utility

Provides console logging capabilities (supports different log levels).

```typescript
import { Logger } from "@mcswift/base-utils";

Logger.info("This is an info message");
Logger.error(new Error("This is an error"));
```

#### 2. String Utility

Provides methods for generating random strings.

```typescript
import { nanoid, randomString } from "@mcswift/base-utils";

const id = nanoid(); // Generate a custom random ID
const random = randomString(10); // Generate a random string of specified length
```

#### 3. Object Utility

Provides deep freeze and deep seal functionalities for objects.

```typescript
import { deepFreeze, deepSeal } from "@mcswift/base-utils";

const obj = { a: { b: 1 } };
const frozenObj = deepFreeze(obj); // Deep freeze
const sealedObj = deepSeal(obj);   // Deep seal
```

#### 4. Other Utilities

Provides a basic deep clone method (based on `JSON.stringify`).

```typescript
import { simpleClone } from "@mcswift/base-utils";

const obj = { a: 1 };
const clonedObj = simpleClone(obj);
```

#### 5. GBK Encoding Conversion

Provides GBK related encoding and decoding functions.

```typescript
import { GBK } from "@mcswift/base-utils";

// GBK related processing
```

#### 6. Pinyin Sort

Provides the ability to sort Chinese strings by Pinyin.

```typescript
import { pinyinSort } from "@mcswift/base-utils";

// Pinyin sorting
```