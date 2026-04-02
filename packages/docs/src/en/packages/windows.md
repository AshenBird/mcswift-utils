# @mcswift/windows




Provides specific utility methods for the Windows operating system, such as retrieving information about installed applications via the Registry and PowerShell.

### Installation

```bash
npm install @mcswift/windows
# or
pnpm add @mcswift/windows
```

### Usage Guide & API Documentation

#### 1. Get Installed Applications

By reading the Windows Registry (`App Paths`), this function retrieves a list of applications installed and registered in the system, along with their executable file paths.

```typescript
import { getInstalledApp, installedAppMap } from "@mcswift/windows";

async function fetchWindowsApps() {
  // Execute PowerShell command and parse registry information
  const apps = await getInstalledApp();
  
  // `apps` is equivalent to `installedAppMap`, returning a Map object
  // Key is the program name (without extension), value is the specific path and extension info
  if (apps.has("chrome")) {
    console.log("Chrome path:", apps.get("chrome")?.path);
  }
  
  // Iterate through all fetched applications
  for (const [name, info] of apps) {
    console.log(`${name}: ${info.path} (Extension: ${info.extension})`);
  }
}

fetchWindowsApps();
```

**Type Annotations:**
```typescript
type InstalledAppRecord = {
  path: string;
  name: string;
  extension: string;
};

type InstalledAppMap = Map<string, InstalledAppRecord>;

const installedAppMap: InstalledAppMap;
const getInstalledApp: () => Promise<InstalledAppMap>;
```

#### 2. Built-in PowerShell Command Strings

You can also directly access and use the built-in raw PowerShell command strings provided by the library:

```typescript
import { getInstalledAppCommand } from "@mcswift/windows";

// Returns the concatenated PowerShell command string used to query App Paths
console.log(getInstalledAppCommand);
```

**Type Annotations:**
```typescript
const getInstalledAppCommand: string;
```