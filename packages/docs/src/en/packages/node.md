# @mcswift/node




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