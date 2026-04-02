# @mcswift/npm

[English](#english) | [中文](#中文)

---

## 中文

提供针对 `package.json` 文件进行快速读取、修改的便捷工具类。

### 安装

```bash
npm install @mcswift/npm
# or
pnpm add @mcswift/npm
```

### 使用指南及接口文档

`NpmPackage` 类可以实例化以表示某个目录下的 npm 包（对应其 `package.json`），也提供了几个静态方法直接读写信息。

#### 1. 实例化使用

实例使用 Proxy 代理了 `package.json` 中的字段，可以直接读取 `name`、`version` 等信息。

```typescript
import { NpmPackage } from "@mcswift/npm";

// 传入包含 package.json 的目录路径
const pkg = new NpmPackage("./packages/my-lib");

// 访问 package.json 中的字段（支持类型推导）
console.log(pkg.name);
console.log(pkg.version);

// 更新字段
pkg.setPackageInfo("version", "1.0.1");

// 删除字段
pkg.deletePackageInfo("description");

// 获取完整的数据
console.log(pkg.data);
```

**类型注释：**
```typescript
import type { NPM } from "@mcswift/types";

class NpmPackage {
  root: string;
  constructor(root: string);
  get data(): NPM.Package;
  getPackageInfo(): NPM.Package;
  setPackageInfo<K extends keyof Required<NPM.Package>>(key: K, value: Required<NPM.Package>[K]): void;
  deletePackageInfo<K extends keyof Required<NPM.Package>>(key: K): void;
  
  static getPackageInfo: (root?: string) => NPM.Package;
  static setPackageInfo: <K extends keyof Required<NPM.Package>>(key: K, value: Required<NPM.Package>[K], root?: string) => void;
  static deletePackageInfo: <K extends keyof Required<NPM.Package>>(key: K, root?: string) => void;
}
```

#### 2. 静态方法使用

如果你只需要一次性读写，也可以直接使用静态方法：

```typescript
import { NpmPackage } from "@mcswift/npm";

const rootDir = "./packages/my-lib";

// 获取 package.json 内容
const info = NpmPackage.getPackageInfo(rootDir);

// 修改特定字段
NpmPackage.setPackageInfo("author", "McSwift", rootDir);

// 删除特定字段
NpmPackage.deletePackageInfo("keywords", rootDir);
```

---

## English

A convenient utility class for quickly reading and modifying `package.json` files.

### Installation

```bash
npm install @mcswift/npm
# or
pnpm add @mcswift/npm
```

### Usage Guide & API Documentation

The `NpmPackage` class can be instantiated to represent an npm package in a specific directory (corresponding to its `package.json`). It also provides several static methods for direct reading and writing.

#### 1. Instantiation Usage

The instance uses a Proxy to proxy the fields in `package.json`, allowing you to directly read information such as `name` and `version`.

```typescript
import { NpmPackage } from "@mcswift/npm";

// Pass in the directory path containing package.json
const pkg = new NpmPackage("./packages/my-lib");

// Access fields in package.json (supports type inference)
console.log(pkg.name);
console.log(pkg.version);

// Update a field
pkg.setPackageInfo("version", "1.0.1");

// Delete a field
pkg.deletePackageInfo("description");

// Get the complete data
console.log(pkg.data);
```

**Type Annotations:**
```typescript
import type { NPM } from "@mcswift/types";

class NpmPackage {
  root: string;
  constructor(root: string);
  get data(): NPM.Package;
  getPackageInfo(): NPM.Package;
  setPackageInfo<K extends keyof Required<NPM.Package>>(key: K, value: Required<NPM.Package>[K]): void;
  deletePackageInfo<K extends keyof Required<NPM.Package>>(key: K): void;
  
  static getPackageInfo: (root?: string) => NPM.Package;
  static setPackageInfo: <K extends keyof Required<NPM.Package>>(key: K, value: Required<NPM.Package>[K], root?: string) => void;
  static deletePackageInfo: <K extends keyof Required<NPM.Package>>(key: K, root?: string) => void;
}
```

#### 2. Static Method Usage

If you only need to read or write once, you can also use static methods directly:

```typescript
import { NpmPackage } from "@mcswift/npm";

const rootDir = "./packages/my-lib";

// Get package.json content
const info = NpmPackage.getPackageInfo(rootDir);

// Modify a specific field
NpmPackage.setPackageInfo("author", "McSwift", rootDir);

// Delete a specific field
NpmPackage.deletePackageInfo("keywords", rootDir);
```