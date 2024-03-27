import { Chalk } from "chalk";
import { toJsonString } from "./json";
const { red,white,green,yellow, blue,gray } = new Chalk()
const getTimeText = () => {
  const date = new Date();
  const timeString = date.toLocaleTimeString();
  const time = ` ${timeString} `;
  return time;
};

const transform = (val:unknown)=>{
  if(typeof val === "string")return val
  const v = toJsonString(val)
  if(v)return v
  return val
}

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
export class Logger {
  static log = log;
  static info = info;
  static error = error;
  static warn = warn;
  static debug = debug
}
