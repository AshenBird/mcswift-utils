# @mcswift/cli




A lightweight Node.js command-line application building tool that provides basic command registration, argument parsing, and optional Schema validation.

### Installation

```bash
npm install @mcswift/cli
# or
pnpm add @mcswift/cli
```

### Usage Guide & API Documentation

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

**Type Annotations:**
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

**Type Annotations:**
```typescript
type Options = Record<string, string | number | boolean>;

interface Handle<T extends Options> {
  (options: T, cli: Cli): unknown;
}

type CommandInit<T extends Options> = {
  name: string;
  handle: Handle<T>;
  schema?: { parse: (val: unknown) => T }; // Compatible with parse method of Zod and similar libraries
};
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

**Type Annotations:**
```typescript
class Command<T extends Options = Options> {
  name: string;
  handle: Handle<T>;
  schema?: { parse: (val: unknown) => T };
  constructor(options: CommandInit<T>);
}
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

#### 5. Command-line Argument Parser Utility

Provides an underlying command-line argument parsing function.

```typescript
import { resolveCliOption } from "@mcswift/cli";

// Parse an array like ["--name", "mcswift", "--force"] into an object
const options = resolveCliOption(process.argv.slice(3));
// => { name: "mcswift", force: true }
```

**Type Annotations:**
```typescript
const resolveCliOption: <O extends Options = Options>(options: string[]) => O;
```