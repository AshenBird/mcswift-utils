import { AsyncParser } from '@json2csv/whatwg'
const csvParser = new AsyncParser(
  {
    eol: '\n',
  },
  {},
  {}
)

/**
 * @param data 对象数组,每个元素是一条数据，数据中 key 将作为列名，value 讲作为值
 * @returns
 */
const CSVStringify = async (data: Record<string, unknown>[]) => {
  const csv = await csvParser.parse(data)
  return csv
}

export class CSV {
  stringify = CSVStringify
  // @todo
  parse = () => {}
}
