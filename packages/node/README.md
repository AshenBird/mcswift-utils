# @mcswift/node

[English](#english) | [中文](#中文)

---

## 中文

针对 Node.js 环境提供的一系列增强工具和方法，包括文件系统、路径处理、子进程操作以及环境变量解析。

### 安装

```bash
npm install @mcswift/node
# or
pnpm add @mcswift/node
```

### 功能模块及接口文档

#### 1. 路径与文件工具 (Path & File)

提供了绝对路径转换、递归获取文件及目录，以及在 `node_modules/.bin` 中查找命令文件的能力。

```typescript
import { 
  getAbsolutePath, 
  getFilePaths, 
  getDirectoryPaths, 
  getCommandFile 
} from "@mcswift/node";

// 转换为绝对路径（默认基于 process.cwd()）
const absPath = getAbsolutePath("src/index.ts");

// 递归获取目录下所有文件路径（支持传入排除路径数组）
const files = getFilePaths("./src", ["./src/ignore"]);

// 递归获取目录下所有的文件夹路径
const dirs = getDirectoryPaths("./src");

// 向上查找 npm 安装的命令（在 node_modules/.bin 中查找）
const cmdPath = getCommandFile("eslint", __dirname);
```

**类型注释：**
```typescript
const getAbsolutePath: (raw: string, base?: string) => string;
const getCommandFile: (command: string, root?: string) => string | undefined;
const getFilePaths: (path: string, exclude?: string[]) => string[];
const getDirectoryPaths: (path: string) => string[];
```

#### 2. 子进程工具 (Child Process)

提供针对 `child_process` 的 Promise 封装，便于使用 `async/await` 执行 shell 命令。

```typescript
import { child_process } from "@mcswift/node";

async function run() {
  try {
    const output = await child_process.Promisify.exec("ls -la", { cwd: "./" });
    console.log(output);
  } catch (err) {
    console.error(err);
  }
}
run();
```

**类型注释：**
```typescript
import type { ExecOptions } from "node:child_process";

namespace child_process {
  const Promisify: {
    exec: (command: string, options: ExecOptions) => Promise<string>;
  };
}
```

#### 3. Path 环境变量解析 (Path Program)

用于解析系统 `Path` 环境变量中的可执行程序（如 `.exe`, `.cmd`, `.bat`, `.ps1`）。主要适用于 Windows 环境，将环境中的所有可执行命令进行缓存和映射。

```typescript
import { getPathProgram } from "@mcswift/node";

async function findPrograms() {
  // 返回一个 Map，键为命令名称（不含扩展名），值为对应的执行文件信息列表
  const programs = await getPathProgram();
  
  if (programs.has("node")) {
    console.log("Node programs found:", programs.get("node"));
  }
}
findPrograms();
```

**类型注释：**
```typescript
type PathProgramInfo = {
  name: string;
  type: string;
  call: string;
  path: string;
};

const getPathProgram: () => Promise<Map<string, PathProgramInfo[]>>;
```

---

## English

A series of enhanced tools and methods for the Node.js environment, including file system operations, path manipulation, child process handling, and environment variable parsing.

### Installation

```bash
npm install @mcswift/node
# or
pnpm add @mcswift/node
```

### Features & API Documentation

#### 1. Path & File Utilities

Provides the ability to convert to absolute paths, recursively get files and directories, and find command files within `node_modules/.bin`.

```typescript
import { 
  getAbsolutePath, 
  getFilePaths, 
  getDirectoryPaths, 
  getCommandFile 
} from "@mcswift/node";

// Convert to an absolute path (defaults to process.cwd())
const absPath = getAbsolutePath("src/index.ts");

// Recursively get all file paths in a directory (supports an array of paths to exclude)
const files = getFilePaths("./src", ["./src/ignore"]);

// Recursively get all folder paths in a directory
const dirs = getDirectoryPaths("./src");

// Search upwards for an npm installed command (looks in node_modules/.bin)
const cmdPath = getCommandFile("eslint", __dirname);
```

**Type Annotations:**
```typescript
const getAbsolutePath: (raw: string, base?: string) => string;
const getCommandFile: (command: string, root?: string) => string | undefined;
const getFilePaths: (path: string, exclude?: string[]) => string[];
const getDirectoryPaths: (path: string) => string[];
```

#### 2. Child Process Utilities

Provides a Promise wrapper for `child_process`, making it easy to execute shell commands using `async/await`.

```typescript
import { child_process } from "@mcswift/node";

async function run() {
  try {
    const output = await child_process.Promisify.exec("ls -la", { cwd: "./" });
    console.log(output);
  } catch (err) {
    console.error(err);
  }
}
run();
```

**Type Annotations:**
```typescript
import type { ExecOptions } from "node:child_process";

namespace child_process {
  const Promisify: {
    exec: (command: string, options: ExecOptions) => Promise<string>;
  };
}
```

#### 3. Path Program Parser

Used to parse executable programs from the system's `Path` environment variable (such as `.exe`, `.cmd`, `.bat`, `.ps1`). Mainly applicable to Windows environments, it caches and maps all executable commands found in the environment.

```typescript
import { getPathProgram } from "@mcswift/node";

async function findPrograms() {
  // Returns a Map where the key is the command name (without extension),
  // and the value is a list of corresponding executable file information
  const programs = await getPathProgram();
  
  if (programs.has("node")) {
    console.log("Node programs found:", programs.get("node"));
  }
}
findPrograms();
```

**Type Annotations:**
```typescript
type PathProgramInfo = {
  name: string;
  type: string;
  call: string;
  path: string;
};

const getPathProgram: () => Promise<Map<string, PathProgramInfo[]>>;
```