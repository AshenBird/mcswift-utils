# @mcswift/utils




`@mcswift/utils` is an aggregated package that re-exports all the features of the foundational utility libraries under the `@mcswift` namespace. This allows developers to install once and import various tools on demand.

### Installation

```bash
npm install @mcswift/utils
# or
pnpm add @mcswift/utils
```

### Feature Modules and Export Paths

To reduce bundle size, all sub-packages are mapped using the `exports` field. You can import features from specific modules as follows:

#### 1. Base Utilities (`@mcswift/base-utils`)

Includes common tools like queue schedulers, loggers, and object manipulation.

```typescript
import { Scheduler, Logger, deepFreeze } from "@mcswift/utils/common";
```

#### 2. Node.js Utilities (`@mcswift/node`)

Includes file path resolution, child process handling, system Path variable parsing, etc.

```typescript
import { getAbsolutePath, getFilePaths, child_process } from "@mcswift/utils/node";
```

#### 3. Windows Specific Utilities (`@mcswift/windows`)

Encapsulates specific operations executed on Windows systems.

```typescript
import { windows } from "@mcswift/utils/windows";
```

#### 4. CLI Build Utilities (`@mcswift/cli`)

Classes and methods for quickly building command-line applications.

```typescript
import { Cli, Command } from "@mcswift/utils/cli";
```

#### Other Sub-packages

Features like `esbuild`, `npm`, `svn`, `tsc`, etc., are also exported at the root level by default. You can import them directly from `@mcswift/utils`:

```typescript
import { NpmPackage, Svn, generatorDeclare } from "@mcswift/utils";
```

> For detailed module APIs, please refer to the README documentation of the respective sub-packages.
