# @mcswift/tsc

[English](#english) | [中文](#中文)

---

## 中文

提供基于 TypeScript 的声明文件生成工具，方便在打包构建等流程中快速生成 `.d.ts` 声明文件。

### 安装

```bash
npm install @mcswift/tsc
# or
pnpm add @mcswift/tsc
```

> **注意：** 使用该包需要在运行环境中已经安装了 `typescript` 并确保在 `node_modules/.bin` 下能够找到 `tsc` 命令。

### 使用指南

你可以使用 `generatorDeclare` 快速为指定目录生成 TypeScript 声明文件，底层会自动查找并调用 `tsc`。

#### 1. 生成类型声明文件

默认会读取当前工作目录下的 `tsconfig.json` 并只输出声明文件（`--emitDeclarationOnly`）。

```typescript
import { generatorDeclare } from "@mcswift/tsc";

async function buildDeclarations() {
  // 指定源码输入目录和声明文件输出目录
  await generatorDeclare("src", "types");
  console.log("声明文件生成完毕！");
}

buildDeclarations();
```

#### 2. 自定义执行目录与配置文件

如果你的项目结构比较复杂，你可以指定执行的根目录和配置文件的路径：

```typescript
import { generatorDeclare } from "@mcswift/tsc";

async function build() {
  const rootDir = process.cwd(); // 或者指定特定的包目录
  const tsconfigPath = "./tsconfig.build.json";
  
  await generatorDeclare("src", "dist/types", rootDir, tsconfigPath);
}
```

---

## English

Provides a TypeScript-based declaration file generation tool, making it easy to quickly generate `.d.ts` declaration files during bundling and build processes.

### Installation

```bash
npm install @mcswift/tsc
# or
pnpm add @mcswift/tsc
```

> **Note:** Using this package requires `typescript` to be installed in your runtime environment, and ensuring the `tsc` command can be found under `node_modules/.bin`.

### Usage Guide

You can use `generatorDeclare` to quickly generate TypeScript declaration files for a specified directory. It automatically locates and invokes `tsc` under the hood.

#### 1. Generate Type Declaration Files

By default, it reads the `tsconfig.json` in the current working directory and only emits declaration files (`--emitDeclarationOnly`).

```typescript
import { generatorDeclare } from "@mcswift/tsc";

async function buildDeclarations() {
  // Specify the source input directory and the declaration file output directory
  await generatorDeclare("src", "types");
  console.log("Declaration files generated successfully!");
}

buildDeclarations();
```

#### 2. Custom Execution Directory and Configuration File

If your project structure is complex, you can specify the root directory for execution and the path to the configuration file:

```typescript
import { generatorDeclare } from "@mcswift/tsc";

async function build() {
  const rootDir = process.cwd(); // Or specify a specific package directory
  const tsconfigPath = "./tsconfig.build.json";
  
  await generatorDeclare("src", "dist/types", rootDir, tsconfigPath);
}
```