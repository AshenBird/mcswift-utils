import { JSONValue } from "./JSON";
import { EmailUrl } from "./string";

export namespace NPM {
  export interface Package {
    author?: Author;
    bin?: string | Record<string, string>;
    browser?: string;
    bugs?: Bugs;
    bundleDependencies?: string[];
    config?: JSONValue;
    contributors?: Author[];
    cpu?: string[];
    dependencies?: Record<string, string>;
    description?: string;
    devDependencies?: Record<string, string>;
    directories?: Directories;
    engines?: Record<string, string>;
    exports?: Record<ExportsNameString, RelativePathString | ExportsByModule>;
    files?: string[];
    funding?: Funding;
    homepage?: string;
    keywords?: string[];
    license?: string;
    main?: string;
    man?: string;
    name?: string;
    optionalDependencies?: string[];
    os?: string[];
    overrides?: Overrides;
    peerDependencies?: Record<string, string>;
    peerDependenciesMeta?: Record<string, { optional: boolean }>;
    private?: boolean;
    publishConfig?: JSONValue;
    repository?: Repository;
    scripts?: Record<string, string>;
    version?: string;
    workspaces?: string[];
    module?:string,
    type?:"module"|"commonjs"
  }
}
type NpmPackageURI = `${string}:${string}`;

type ExportsByModule = Record<ExportTypes, RelativePathString>;
type ExportTypes = "import" | "require" | "types" | "default";
type ExportsNameString = "." | RelativePathString;
type RelativePathString = `./${string}`;
type AuthorRecord = {
  name?: string;
  email?: string;
  url?: NpmPackageURI;
};
type Bugs =
  | string
  | {
      email?: EmailUrl;
      url?: NpmPackageURI;
    };
type Author = string | AuthorRecord;
type Funding = FundingRecord | FundingRecord[];
type FundingRecord =
  | NpmPackageURI
  | {
      type: string;
      url: NpmPackageURI;
    };
type Directories = {
  bin?: string;
  man?: string;
  doc?: string;
  lib?: string;
};

type Repository = {
  type?: string;
  url?: string;
  directory?: string;
};
interface Overrides extends Record<string, string | Overrides> {}
