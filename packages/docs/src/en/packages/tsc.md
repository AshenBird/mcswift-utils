# @mcswift/tsc




Provides a TypeScript-based declaration file generation tool, making it easy to quickly generate `.d.ts` declaration files during bundling and build processes.

### Installation

```bash
npm install @mcswift/tsc
# or
pnpm add @mcswift/tsc
```

> **Note:** Using this package requires `typescript` to be installed in your runtime environment, and ensuring the `tsc` command can be found under `node_modules/.bin`.

### Usage Guide & API Documentation

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

**Type Annotations:**
```typescript
const generatorDeclare: (
  inputDir: string,
  outDir: string,
  root?: string,
  tsconfig?: string
) => Promise<void>;
```