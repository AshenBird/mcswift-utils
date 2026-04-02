# @mcswift/types




Provides a series of fundamental TypeScript type definitions, including standard JSON data structures and strictly-typed constraints for NPM's `package.json`.

### Installation

```bash
npm install @mcswift/types -D
# or
pnpm add @mcswift/types -D
```

### Usage Guide & API Documentation

You can import types directly from this library and use them in your TypeScript code to enforce stricter type constraints.

#### 1. JSON Types

Provides standard JSON data structure types:

```typescript
import type { JSONValue, JSONArray, JSONRecord, JSONBaseValue } from "@mcswift/types";

const data: JSONRecord = {
  name: "mcswift",
  age: 18,
  hobbies: ["coding", "reading"],
};

const arr: JSONArray = [1, "2", true, null];
```

**Type Annotations:**
```typescript
export type JSONBaseValue = string | number | boolean | null;

export interface JSONRecord {
  [key: string]: JSONValue;
}

export type JSONValue = JSONBaseValue | JSONRecord | JSONValue[];

export type JSONArray = JSONValue[];
```

#### 2. NPM Package Types

Provides strictly-typed constraints for `package.json`:

```typescript
import type { NPM } from "@mcswift/types";

const packageJson: NPM.Package = {
  name: "my-package",
  version: "1.0.0",
  type: "module",
  scripts: {
    build: "tsc"
  },
  dependencies: {
    "lodash": "^4.17.21"
  }
};
```

**Type Annotations:**
```typescript
export namespace NPM {
  export interface Package {
    name?: string;
    version?: string;
    description?: string;
    scripts?: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    type?: "module" | "commonjs";
    // ... Contains complete package.json field definitions
  }
}
```

#### 3. String Extension Types

Provides basic string template type constraints, such as email addresses:

```typescript
import type { EmailUrl } from "@mcswift/types";

const email: EmailUrl = "admin@example.com";
```

**Type Annotations:**
```typescript
export type EmailUrl = `${string}@${string}.${string}`;
```