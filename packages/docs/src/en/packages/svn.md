# @mcswift/svn




Encapsulates common SVN (Subversion) command-line operations, making it easy to quickly retrieve SVN repository information, status, and execute commit/update operations in Node.js.

### Installation

```bash
npm install @mcswift/svn
# or
pnpm add @mcswift/svn
```

> **Note:** Using this package requires the `svn` command-line tool to be installed and configured in your runtime environment.

### Usage Guide & API Documentation

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

**Type Annotations:**
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

#### 2. Get File Status

Get the modification status of the working copy, including a list of untracked/modified files and count statistics:

```typescript
import { Svn } from "@mcswift/svn";

const statusInfo = Svn.status;

console.log("Total changes:", statusInfo.counts.total);
console.log("Detailed status list:", statusInfo.status);
```

**Type Annotations:**
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

**Type Annotations:**
```typescript
class Svn {
  static update(root?: string): void;
  static commit(fileList: string[], message: string, root?: string): void;
}
```