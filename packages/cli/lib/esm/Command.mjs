// packages/cli/src/Command.ts
var Command = class {
  name = "";
  handle;
  schema;
  constructor(initial) {
    const { name, handle, schema } = initial;
    this.handle = handle;
    this.schema = schema;
    if (typeof name === "symbol") {
      if (!name.description)
        throw new Error(
          "must provide 'description' when 'Command' name use symbol type."
        );
      this.name = name.description;
      return;
    }
    this.name = name;
  }
};
export {
  Command
};
