# @mcswift/utils

[English](#english) | [中文](#中文)

---

## 中文

`@mcswift/utils` 是一个聚合包，它重新导出了 `@mcswift` 命名空间下所有基础工具库的功能，方便开发者一次性安装并按需引入各类工具。

### 安装

```bash
npm install @mcswift/utils
# or
pnpm add @mcswift/utils
```

### 功能模块与导出路径

为了减小打包体积，所有的子包都通过 `exports` 进行了路径映射。你可以通过如下方式引入对应模块的功能：

#### 1. 基础工具 (`@mcswift/base-utils`)

包括了队列调度、日志打印、对象处理等通用工具。

```typescript
import { Scheduler, Logger, deepFreeze } from "@mcswift/utils/common";
```

#### 2. Node.js 工具 (`@mcswift/node`)

包括了文件路径解析、子进程处理、系统 Path 变量解析等。

```typescript
import { getAbsolutePath, getFilePaths, child_process } from "@mcswift/utils/node";
```

#### 3. Windows 特有工具 (`@mcswift/windows`)

封装了在 Windows 系统下执行的特有操作。

```typescript
import { windows } from "@mcswift/utils/windows";
```

#### 4. CLI 构建工具 (`@mcswift/cli`)

用于快速构建命令行应用的类和方法。

```typescript
import { Cli, Command } from "@mcswift/utils/cli";
```

#### 其他子包

像 `esbuild`、`npm`、`svn`、`tsc` 等功能也被默认导出在了根路径下，你可以直接从 `@mcswift/utils` 中导入：

```typescript
import { NpmPackage, Svn, generatorDeclare } from "@mcswift/utils";
```

> 详细的模块 API 请参考对应子包的 README 文档。

---

## English

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
