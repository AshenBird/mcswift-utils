# @mcswift/npm




A convenient utility class for quickly reading and modifying `package.json` files.

### Installation

```bash
npm install @mcswift/npm
# or
pnpm add @mcswift/npm
```

### Usage Guide & API Documentation

The `NpmPackage` class can be instantiated to represent an npm package in a specific directory (corresponding to its `package.json`). It also provides several static methods for direct reading and writing.

#### 1. Instantiation Usage

The instance uses a Proxy to proxy the fields in `package.json`, allowing you to directly read information such as `name` and `version`.

```typescript
import { NpmPackage } from "@mcswift/npm";

// Pass in the directory path containing package.json
const pkg = new NpmPackage("./packages/my-lib");

// Access fields in package.json (supports type inference)
console.log(pkg.name);
console.log(pkg.version);

// Update a field
pkg.setPackageInfo("version", "1.0.1");

// Delete a field
pkg.deletePackageInfo("description");

// Get the complete data
console.log(pkg.data);
```

**Type Annotations:**
```typescript
import type { NPM } from "@mcswift/types";

class NpmPackage {
  root: string;
  constructor(root: string);
  get data(): NPM.Package;
  getPackageInfo(): NPM.Package;
  setPackageInfo<K extends keyof Required<NPM.Package>>(key: K, value: Required<NPM.Package>[K]): void;
  deletePackageInfo<K extends keyof Required<NPM.Package>>(key: K): void;
  
  static getPackageInfo: (root?: string) => NPM.Package;
  static setPackageInfo: <K extends keyof Required<NPM.Package>>(key: K, value: Required<NPM.Package>[K], root?: string) => void;
  static deletePackageInfo: <K extends keyof Required<NPM.Package>>(key: K, root?: string) => void;
}
```

#### 2. Static Method Usage

If you only need to read or write once, you can also use static methods directly:

```typescript
import { NpmPackage } from "@mcswift/npm";

const rootDir = "./packages/my-lib";

// Get package.json content
const info = NpmPackage.getPackageInfo(rootDir);

// Modify a specific field
NpmPackage.setPackageInfo("author", "McSwift", rootDir);

// Delete a specific field
NpmPackage.deletePackageInfo("keywords", rootDir);
```