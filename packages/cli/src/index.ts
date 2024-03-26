
import { argv } from 'node:process'
import { ZodBoolean, ZodNull, ZodString, z } from "zod"

export const resolveCliOption = (options: string[]) => {
  const coups = options
    .join(' ') // 重新拼接成字符串
    .split('--') // 按照 -- 重新分隔
    .map((coup) =>
      coup
        .split(' ')
        .map((w) => w.trim())
        .filter((w) => !!w)
    )
    .filter((c) => c.length > 0)
  const result: Record<string, string | boolean|null> = {}
  for (const [k, v] of coups) {
    // 非空格分隔参数
    if (k.includes('=')) {
      if (v) throw new Error('瞎写参数')
      const nc = k.split('=')
      if (nc.length > 2) throw new Error('瞎写参数')
      result[nc[0]] = optionHandle(nc[1])
      continue
    }
    // 开关参数
    if (typeof v === 'undefined') {
      result[k] = true
      continue
    }
    // 通常参数
    result[k] = optionHandle(v)
  }
  return result
}

// 将一些模式值转换成 js 兼容的值
export const optionHandle = (val: string): (string | boolean|null) => {
  // if (val.startsWith('`') && val.endsWith('`')) {
  //   return val.slice(0, -1)
  // }
  if (val === 'true') {
    return true
  }
  if (val === 'false') {
    return false
  }
  if (val === 'null') {
    return null
  }
  return val
}

const OptionsSchema = z.object({} as {[k:string]:ZodString|ZodBoolean|ZodNull})
type OptionsSchema = typeof OptionsSchema
// type CliOptions = Record<string, string | boolean >
type CommandInitial<T extends OptionsSchema = OptionsSchema> ={
  name:string
  handle:(options:z.infer<T>)=>unknown
  schema?:T
}
export class Cli {
  readonly name: string
  constructor(name:string = ""){
    this.name = name
  }
  private map = new Map<string,Command>()
  use<T extends OptionsSchema = OptionsSchema>(name:string,handle:(options:z.infer<T>)=>unknown,schema?:T){
    const command = new Command({
      name,
      handle,
      schema
    }) as unknown as Command<OptionsSchema>
    
    this.map.set(name,command)
  }
  start(){
    const [_node, _entry, name, ...args] = argv
    // 获得 name 
    const command = this.map.get(name);
    if(!command){
      // Logger
      return
    }
    const options = resolveCliOption(args);
    // 校验
    if(command.schema){
      command.schema.parse(options)
    }
    // 执行
    command.handle(options)
  }
}

export class Command<T extends OptionsSchema = OptionsSchema>{
  name:string = ""
  handle:(options:z.infer<T>)=>unknown
  schema?:T
  constructor(initial:CommandInitial<T>){
    const {name,handle,schema} = initial
    this.name = name
    this.handle = handle
    this.schema = schema
  }
}
