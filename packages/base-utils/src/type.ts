export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isBigint = (val: unknown): val is bigint => typeof val === 'bigint'
export const isBoolean = (val: unknown): val is boolean =>
  typeof val === 'boolean'
export const isFunction = (val: unknown): val is ((...args:unknown[]) =>unknown)=>
  typeof val === 'function'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

export const isUndefined = (val: unknown): val is undefined =>
  typeof val === 'undefined'
export const isNull = (val: unknown): val is null => val === null

// 是否是值类型
export const isValueType = (
  val: unknown
): val is number | string | symbol | boolean | bigint => {
  return ['symbol', 'string', 'number', 'bigint', 'boolean'].includes(
    typeof val
  )
}