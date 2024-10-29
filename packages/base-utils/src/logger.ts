import { Chalk, ChalkInstance } from "chalk";
import { toJsonString } from "./json";
const { red, white, green, yellow, blue, gray } = new Chalk();
const getTimeText = () => {
  const date = new Date();
  const timeString = date.toLocaleTimeString();
  const time = ` ${timeString} `;
  return time;
};

const transform = (val: unknown) => {
  if (typeof val === "string") return val;
  const v = toJsonString(val);
  if (v) return v;
  return val;
};

const log = (info: unknown) => {
  console.log(green(getTimeText()), white(transform(info)));
};
const info = (info: unknown) => {
  console.log(gray(getTimeText()), white(transform(info)));
};
const error = (info: unknown) => {
  console.log(red(getTimeText()), white(transform(info)));
};
const warn = (info: unknown) => {
  console.log(yellow(getTimeText()), white(transform(info)));
};

const debug = (info: unknown) => {
  console.log(blue(getTimeText()), white(transform(info)));
};
const store = new Map<string, Logger>();

const convertToJsonRecord = (val:unknown):string=>{
  if(typeof val==="boolean")return val.toString()
  if(typeof val==="number")return val.toString()
  if(typeof val==="string")return val.toString()
  if(typeof val==="undefined")return "undefined"
  if(typeof val==="symbol")return val.toString()
  if(typeof val==="function")return val.toString()
  if(typeof val==="bigint")return `${val.toString()}n`
  if(val===null)return "null"
  if(Array.isArray(val)){
    return JSON.stringify(val.map(convertToJsonRecord),undefined,2);
  }
  if(val instanceof Map){
    const record = [...val.entries()].reduce((a,c:[unknown,unknown])=>{
      const [key,value] = c;
      a[convertToJsonRecord(key)] = convertToJsonRecord(value);
      return a
    },{} as Record<string|symbol|number,unknown>)

    return `Map(${JSON.stringify(record,undefined,2)})`;
  }
  
  if(val instanceof Set){
    const arr = [...val.values()].map(convertToJsonRecord) as string[]

    return `Set(${JSON.stringify(arr,undefined,2)})`;
  }
  const r = Object.entries(val).reduce((a,c:[string|symbol|number,unknown])=>{
    const [key,value] = c;
    a[key] = convertToJsonRecord(value);
    return a
  },{} as Record<string|symbol|number,unknown>)
  try{
    return JSON.stringify(r,undefined,2)
  }catch(e){
    return val.toString()
  }
}


export class Logger {
  static log = log;
  static info = info;
  static error = error;
  static warn = warn;
  static debug = debug;
  private channel: string;
  constructor(channel: string) {
    this.channel = channel;
    store.set(channel, this);
  }
  private levelFac(level: string, color: ChalkInstance) {
    return (...args: unknown[]) =>
      console.log(
        color(`[${getTimeText()}|${level}|${this.channel}]`),
        ...args.map((info) => white(transform(info)))
      );
  }
  log(...args:unknown[]) {
    this.levelFac("LOG",green)(...args.map(convertToJsonRecord))
  }
  info(...args:unknown[]) {
    this.levelFac("INFO",green)(...args.map(convertToJsonRecord))
  }
  error(...args:unknown[]) {
    this.levelFac("ERROR",red)(...args.map(convertToJsonRecord))
  }
  warn(...args:unknown[]) {
    this.levelFac("WARN",yellow)(...args.map(convertToJsonRecord))
  }

  debug(...args:unknown[]) {
    this.levelFac("DEBUG",blue)(...args.map(convertToJsonRecord))
  }
}
