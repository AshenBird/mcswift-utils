# @mcswift/cli




一个轻量级的 Node.js 命令行应用构建工具，提供了基础的命令注册、参数解析以及可选的 Schema 校验功能。

### 安装

```bash
npm install @mcswift/cli
# or
pnpm add @mcswift/cli
```

### 使用指南及接口文档

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

**类型注释：**
```typescript
class Cli {
  readonly name: string;
  constructor(name?: string);
  use<T extends Options>(init: CommandInit<T>): this;
  use<T extends Options>(command: Command<T>): this;
  use(name: string, handle: Handle<Options>): this;
  run(name: string | string[], options?: Options): Promise<this>;
  start(): void;
}
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

**类型注释：**
```typescript
type Options = Record<string, string | number | boolean>;

interface Handle<T extends Options> {
  (options: T, cli: Cli): unknown;
}

type CommandInit<T extends Options> = {
  name: string;
  handle: Handle<T>;
  schema?: { parse: (val: unknown) => T }; // 兼容 Zod 等库的 parse 方法
};
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

**类型注释：**
```typescript
class Command<T extends Options = Options> {
  name: string;
  handle: Handle<T>;
  schema?: { parse: (val: unknown) => T };
  constructor(options: CommandInit<T>);
}
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

#### 5. 命令行参数解析工具

提供底层的命令行参数解析函数。

```typescript
import { resolveCliOption } from "@mcswift/cli";

// 将类似 ["--name", "mcswift", "--force"] 的数组解析为对象
const options = resolveCliOption(process.argv.slice(3));
// => { name: "mcswift", force: true }
```

**类型注释：**
```typescript
const resolveCliOption: <O extends Options = Options>(options: string[]) => O;
```
