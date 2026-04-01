# @mcswift/types

[English](#english) | [中文](#中文)

---

## 中文

提供了一系列基础的 TypeScript 类型定义，包括通用的 JSON 数据结构以及 NPM `package.json` 的强类型约束。

### 安装

```bash
npm install @mcswift/types -D
# or
pnpm add @mcswift/types -D
```

### 使用指南

你可以直接导入该库中的类型，并在你的 TypeScript 代码中使用它们来提供更严格的类型约束。

#### 1. JSON 类型

提供了标准的 JSON 数据结构类型：

```typescript
import type { JSONValue, JSONArray, JSONRecord, JSONBaseValue } from "@mcswift/types";

const data: JSONRecord = {
  name: "mcswift",
  age: 18,
  hobbies: ["coding", "reading"],
};

const arr: JSONArray = [1, "2", true, null];
```

#### 2. NPM Package 类型

提供了强类型的 `package.json` 约束：

```typescript
import type { NPM } from "@mcswift/types";

const packageJson: NPM.Package = {
  name: "my-package",
  version: "1.0.0",
  type: "module",
  scripts: {
    build: "tsc"
  },
  dependencies: {
    "lodash": "^4.17.21"
  }
};
```

#### 3. String 拓展类型

提供了一些基础的字符串模板类型约束，如电子邮件：

```typescript
import type { EmailUrl } from "@mcswift/types";

const email: EmailUrl = "admin@example.com";
```

---

## English

Provides a series of fundamental TypeScript type definitions, including standard JSON data structures and strictly-typed constraints for NPM's `package.json`.

### Installation

```bash
npm install @mcswift/types -D
# or
pnpm add @mcswift/types -D
```

### Usage Guide

You can import types directly from this library and use them in your TypeScript code to enforce stricter type constraints.

#### 1. JSON Types

Provides standard JSON data structure types:

```typescript
import type { JSONValue, JSONArray, JSONRecord, JSONBaseValue } from "@mcswift/types";

const data: JSONRecord = {
  name: "mcswift",
  age: 18,
  hobbies: ["coding", "reading"],
};

const arr: JSONArray = [1, "2", true, null];
```

#### 2. NPM Package Types

Provides strictly-typed constraints for `package.json`:

```typescript
import type { NPM } from "@mcswift/types";

const packageJson: NPM.Package = {
  name: "my-package",
  version: "1.0.0",
  type: "module",
  scripts: {
    build: "tsc"
  },
  dependencies: {
    "lodash": "^4.17.21"
  }
};
```

#### 3. String Extension Types

Provides basic string template type constraints, such as email addresses:

```typescript
import type { EmailUrl } from "@mcswift/types";

const email: EmailUrl = "admin@example.com";
```