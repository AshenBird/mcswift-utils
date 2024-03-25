// packages/base-utils/src/csv.ts
import { AsyncParser } from "@json2csv/whatwg";
var csvParser = new AsyncParser(
  {
    eol: "\n"
  },
  {},
  {}
);
var CSVStringify = async (data) => {
  const csv = await csvParser.parse(data);
  return csv;
};
var CSV = class {
  stringify = CSVStringify;
  // @todo
  parse = () => {
  };
};
export {
  CSV
};
