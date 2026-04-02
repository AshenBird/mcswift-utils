# @mcswift/svn




封装了常见的 SVN (Subversion) 命令行操作，便于在 Node.js 中快速获取 SVN 仓库信息、状态以及执行提交和更新操作。

### 安装

```bash
npm install @mcswift/svn
# or
pnpm add @mcswift/svn
```

> **注意：** 使用该包需要在运行环境中已经安装并配置好了 `svn` 命令行工具。

### 使用指南及接口文档

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

**类型注释：**
```typescript
type SvnInfo = {
  Path: string;
  WorkingCopyRootPath: string;
  URL: string;
  RelativeURL: string;
  RepositoryRoot: string;
  RepositoryUUID: string;
  Revision: string;
  NodeKind: string;
  Schedule: string;
  LastChangedAuthor: string;
  LastChangedRev: string;
  LastChangedDate: string;
  raw: string;
};

class Svn {
  static get info(): SvnInfo;
  static get revision(): string;
}
```

#### 2. 获取文件状态 (Status)

获取工作副本的变更状态，包括未跟踪、已修改等文件列表及数量统计：

```typescript
import { Svn } from "@mcswift/svn";

const statusInfo = Svn.status;

console.log("总变更数:", statusInfo.counts.total);
console.log("详细状态列表:", statusInfo.status);
```

**类型注释：**
```typescript
type SvnStatusRecord = {
  type: string;
  path: string;
  absolute: string;
};

type SvnStatusResult = {
  counts: {
    total: number;
    [type: string]: number;
  };
  status: SvnStatusRecord[];
  raw: string;
};

class Svn {
  static get status(): SvnStatusResult;
}
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

**类型注释：**
```typescript
class Svn {
  static update(root?: string): void;
  static commit(fileList: string[], message: string, root?: string): void;
}
```
