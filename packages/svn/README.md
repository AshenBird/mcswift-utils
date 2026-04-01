# @mcswift/svn

[English](#english) | [中文](#中文)

---

## 中文

封装了常见的 SVN (Subversion) 命令行操作，便于在 Node.js 中快速获取 SVN 仓库信息、状态以及执行提交和更新操作。

### 安装

```bash
npm install @mcswift/svn
# or
pnpm add @mcswift/svn
```

> **注意：** 使用该包需要在运行环境中已经安装并配置好了 `svn` 命令行工具。

### 使用指南

所有操作都通过 `Svn` 类的静态属性或方法来完成，默认以当前工作目录（`process.cwd()`）作为操作目标。

#### 1. 获取 SVN 信息

你可以获取当前目录的 SVN 版本信息和详细的 info 数据：

```typescript
import { Svn } from "@mcswift/svn";

// 获取当前 SVN 版本号 (Revision)
console.log(Svn.revision);

// 获取详细的 SVN 仓库信息
const info = Svn.info;
console.log("URL:", info.URL);
console.log("Last Changed Author:", info.LastChangedAuthor);
```

#### 2. 获取文件状态 (Status)

获取工作副本的变更状态，包括未跟踪、已修改等文件列表及数量统计：

```typescript
import { Svn } from "@mcswift/svn";

const statusInfo = Svn.status;

console.log("总变更数:", statusInfo.counts.total);
console.log("详细状态列表:", statusInfo.status);
```

#### 3. 更新与提交

支持在代码中直接执行 SVN 的更新与提交：

```typescript
import { Svn } from "@mcswift/svn";

// 执行 svn update
Svn.update();

// 执行 svn commit
const filesToCommit = ["src/index.ts", "package.json"];
const commitMessage = "fix: update configurations";

Svn.commit(filesToCommit, commitMessage);
```

---

## English

Encapsulates common SVN (Subversion) command-line operations, making it easy to quickly retrieve SVN repository information, status, and execute commit/update operations in Node.js.

### Installation

```bash
npm install @mcswift/svn
# or
pnpm add @mcswift/svn
```

> **Note:** Using this package requires the `svn` command-line tool to be installed and configured in your runtime environment.

### Usage Guide

All operations are performed through static properties or methods of the `Svn` class, defaulting to the current working directory (`process.cwd()`) as the target.

#### 1. Retrieve SVN Information

You can get the SVN revision and detailed info data for the current directory:

```typescript
import { Svn } from "@mcswift/svn";

// Get the current SVN revision
console.log(Svn.revision);

// Get detailed SVN repository info
const info = Svn.info;
console.log("URL:", info.URL);
console.log("Last Changed Author:", info.LastChangedAuthor);
```

#### 2. Get File Status

Get the modification status of the working copy, including a list of untracked/modified files and count statistics:

```typescript
import { Svn } from "@mcswift/svn";

const statusInfo = Svn.status;

console.log("Total changes:", statusInfo.counts.total);
console.log("Detailed status list:", statusInfo.status);
```

#### 3. Update and Commit

Supports directly executing SVN update and commit from your code:

```typescript
import { Svn } from "@mcswift/svn";

// Execute svn update
Svn.update();

// Execute svn commit
const filesToCommit = ["src/index.ts", "package.json"];
const commitMessage = "fix: update configurations";

Svn.commit(filesToCommit, commitMessage);
```