# @mcswift/cli

[English](#english) | [中文](#中文)

---

## 中文

一个轻量级的 Node.js 命令行应用构建工具，提供了基础的命令注册、参数解析以及可选的 Schema 校验功能。

### 安装

```bash
npm install @mcswift/cli
# or
pnpm add @mcswift/cli
```

### 使用指南

#### 1. 基础使用

你可以通过 `Cli` 类快速创建一个命令行应用，并通过 `use` 方法注册命令：

```typescript
import { Cli } from "@mcswift/cli";

const cli = new Cli("my-cli");

// 注册一个简单命令
cli.use("hello", (options, ctx) => {
  console.log("Hello, World!");
  console.log("Options:", options);
});

// 解析命令行参数并执行对应的命令
cli.start();
```

如果将上述代码保存为 `bin.js`，你可以这样调用它：

```bash
node bin.js hello --name mcswift -f
```

#### 2. 使用配置对象注册命令

你可以传入一个对象来定义命令名称、处理函数，以及使用如 `zod` 的 Schema 来校验传入的参数：

```typescript
import { Cli } from "@mcswift/cli";
import { z } from "zod"; // 需要自行安装 zod

const cli = new Cli("my-app");

cli.use({
  name: "build",
  schema: z.object({
    outDir: z.string().default("dist"),
    minify: z.boolean().default(false),
  }),
  handle: (options, ctx) => {
    // 此时 options 已经被 schema 校验并推导为强类型
    console.log(`Building to ${options.outDir}, minify: ${options.minify}`);
  }
});

cli.start();
```

#### 3. 使用 Command 类

你也可以通过实例化 `Command` 类，并将其传递给 `use` 方法进行注册：

```typescript
import { Cli, Command } from "@mcswift/cli";

const serveCmd = new Command({
  name: "serve",
  handle: (options) => {
    console.log("Server is running...");
  }
});

const cli = new Cli();
cli.use(serveCmd);

cli.start();
```

#### 4. 编程式调用命令

除了自动解析 `argv` 的 `cli.start()` 外，你也可以在代码中手动运行注册的命令：

```typescript
const cli = new Cli();
cli.use("init", () => console.log("Init project..."));

// 手动执行
cli.run("init", { template: "vue" });

// 支持依次执行多个命令
cli.run(["init", "build"]);
```

---

## English

A lightweight Node.js command-line application building tool that provides basic command registration, argument parsing, and optional Schema validation.

### Installation

```bash
npm install @mcswift/cli
# or
pnpm add @mcswift/cli
```

### Usage Guide

#### 1. Basic Usage

You can quickly create a CLI application using the `Cli` class and register commands via the `use` method:

```typescript
import { Cli } from "@mcswift/cli";

const cli = new Cli("my-cli");

// Register a simple command
cli.use("hello", (options, ctx) => {
  console.log("Hello, World!");
  console.log("Options:", options);
});

// Parse command-line arguments and execute the corresponding command
cli.start();
```

If you save the above code as `bin.js`, you can call it like this:

```bash
node bin.js hello --name mcswift -f
```

#### 2. Registering Commands with a Configuration Object

You can pass an object to define the command name, handler function, and use a Schema like `zod` to validate the incoming arguments:

```typescript
import { Cli } from "@mcswift/cli";
import { z } from "zod"; // Requires installing zod separately

const cli = new Cli("my-app");

cli.use({
  name: "build",
  schema: z.object({
    outDir: z.string().default("dist"),
    minify: z.boolean().default(false),
  }),
  handle: (options, ctx) => {
    // Here `options` is already validated and strongly typed by the schema
    console.log(`Building to ${options.outDir}, minify: ${options.minify}`);
  }
});

cli.start();
```

#### 3. Using the Command Class

You can also instantiate the `Command` class and pass it to the `use` method for registration:

```typescript
import { Cli, Command } from "@mcswift/cli";

const serveCmd = new Command({
  name: "serve",
  handle: (options) => {
    console.log("Server is running...");
  }
});

const cli = new Cli();
cli.use(serveCmd);

cli.start();
```

#### 4. Programmatic Command Invocation

Besides automatically parsing `argv` with `cli.start()`, you can also manually run registered commands within your code:

```typescript
const cli = new Cli();
cli.use("init", () => console.log("Init project..."));

// Manually execute
cli.run("init", { template: "vue" });

// Supports executing multiple commands sequentially
cli.run(["init", "build"]);
```