# @mcswift/types




提供了一系列基础的 TypeScript 类型定义，包括通用的 JSON 数据结构以及 NPM `package.json` 的强类型约束。

### 安装

```bash
npm install @mcswift/types -D
# or
pnpm add @mcswift/types -D
```

### 使用指南及接口文档

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

**类型注释：**
```typescript
export type JSONBaseValue = string | number | boolean | null;

export interface JSONRecord {
  [key: string]: JSONValue;
}

export type JSONValue = JSONBaseValue | JSONRecord | JSONValue[];

export type JSONArray = JSONValue[];
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

**类型注释：**
```typescript
export namespace NPM {
  export interface Package {
    name?: string;
    version?: string;
    description?: string;
    scripts?: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    type?: "module" | "commonjs";
    // ... 包含完整的 package.json 字段定义
  }
}
```

#### 3. String 拓展类型

提供了一些基础的字符串模板类型约束，如电子邮件：

```typescript
import type { EmailUrl } from "@mcswift/types";

const email: EmailUrl = "admin@example.com";
```

**类型注释：**
```typescript
export type EmailUrl = `${string}@${string}.${string}`;
```
