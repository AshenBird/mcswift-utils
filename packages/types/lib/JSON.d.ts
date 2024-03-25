
export type JSONBaseValue = string|number|boolean|null

export interface JSONRecord{
  [key:string]:JSONValue
}

export type JSONValue = JSONBaseValue|JSONRecord|JSONValue[]

export type JSONArray = JSONValue[]
